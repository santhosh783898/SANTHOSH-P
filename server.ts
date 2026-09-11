import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { PDFParse } from 'pdf-parse';
import mammoth from 'mammoth';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Initialize Gemini SDK with User-Agent header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Text extraction endpoint
app.post('/api/extract-text', async (req: Request, res: Response) => {
  try {
    const { fileData, fileName, fileType } = req.body;

    if (!fileData) {
      return res.status(400).json({ error: 'No file data received' });
    }

    // Decode base64 to buffer
    const base64Data = fileData.replace(/^data:[^;]+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    const lowerName = (fileName || '').toLowerCase();
    let extractedText = '';

    if (lowerName.endsWith('.pdf') || fileType === 'application/pdf') {
      try {
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        extractedText = result.text || '';
        await parser.destroy();
      } catch (pdfErr: any) {
        console.warn('PDFParse failed, trying text fallback:', pdfErr?.message);
        // Fallback: extract ascii readable strings
        extractedText = buffer.toString('utf-8').replace(/[^\x20-\x7E\n\r\t]/g, ' ');
      }
    } else if (
      lowerName.endsWith('.docx') ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const docxResult = await mammoth.extractRawText({ buffer });
      extractedText = docxResult.value || '';
    } else {
      // Fallback for .txt or markdown
      extractedText = buffer.toString('utf-8');
    }

    const cleanText = extractedText.replace(/\r\n/g, '\n').trim();

    if (!cleanText || cleanText.length < 20) {
      return res.status(422).json({
        error: 'Unable to extract legible text from this file. Please verify it is not scanned or password-protected.',
      });
    }

    res.json({
      text: cleanText,
      charCount: cleanText.length,
      wordCount: cleanText.split(/\s+/).filter(Boolean).length,
    });
  } catch (error: any) {
    console.error('Extraction error:', error);
    res.status(500).json({
      error: 'Failed to extract text from resume: ' + (error?.message || 'Unknown error'),
    });
  }
});

// Resume analysis endpoint
app.post('/api/analyze-resume', async (req: Request, res: Response) => {
  try {
    const { resumeText, targetJobRole, jobDescription, fileName, fileSize } = req.body;

    if (!resumeText || resumeText.trim().length < 30) {
      return res.status(400).json({
        error: 'Resume text is too short or empty. Please upload a valid resume.',
      });
    }

    const jobRole = targetJobRole || 'Software Developer';

    // If Gemini is not configured, send a helpful notice
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please use Demo Analysis mode or set GEMINI_API_KEY in secrets.',
        isApiKeyMissing: true,
      });
    }

    const prompt = `You are a world-class Senior Technical Recruiter and ATS (Applicant Tracking System) Audit Specialist.
Analyze the following candidate resume for the target role: "${jobRole}".
${jobDescription ? `Target Job Description provided:\n"""\n${jobDescription}\n"""\n` : ''}

Candidate Resume Text:
"""
${resumeText.slice(0, 14000)}
"""

CRITICAL INSTRUCTIONS:
1. Do NOT invent, hallucinate, or fabricate any candidate experience, education, certifications, employers, or achievements. Base all analysis strictly on facts present in the text.
2. Provide concrete, actionable, and constructive feedback specifically tailored for college students, freshers, and job seekers.
3. Calculate realistic, granular scores (0-100) based on actual industry hiring benchmarks.
4. Provide genuine Before vs AI Suggestion rewrite examples that strictly preserve the candidate's actual accomplishments while elevating the action verbs, clarity, and metric orientation.
5. Return ONLY a valid JSON object strictly matching this schema with no markdown formatting around it:
{
  "overallScore": number (0-100),
  "atsScore": number (0-100),
  "contentScore": number (0-100),
  "skillsScore": number (0-100),
  "experienceScore": number (0-100),
  "educationScore": number (0-100),
  "formattingScore": number (0-100),
  "keywordScore": number (0-100),
  "jobMatchScore": number (0-100),
  "strengths": string[],
  "weaknesses": string[],
  "skillsFound": string[],
  "recommendedSkills": string[],
  "matchingKeywords": string[],
  "missingKeywords": string[],
  "atsDetails": {
    "isAtsFriendly": boolean,
    "scoreExplanation": string,
    "formattingIssues": string[],
    "tableColumnIssues": string[],
    "headingIssues": string[],
    "contactIssues": string[],
    "keywordUsage": string
  },
  "sectionAnalysis": {
    "contactInfo": {
      "score": number (0-100),
      "status": "good" | "needs_improvement" | "poor",
      "findings": string[],
      "details": {
        "name": string,
        "email": string,
        "phone": string,
        "linkedin": string,
        "github": string,
        "location": string
      }
    },
    "careerObjective": {
      "score": number (0-100),
      "status": "good" | "needs_improvement" | "poor",
      "findings": string[],
      "summaryText": string
    },
    "education": {
      "score": number (0-100),
      "status": "good" | "needs_improvement" | "poor",
      "findings": string[],
      "entries": [
        {
          "degree": string,
          "institution": string,
          "year": string,
          "scoreOrGpa": string,
          "coursework": string[]
        }
      ]
    },
    "skills": {
      "score": number (0-100),
      "status": "good" | "needs_improvement" | "poor",
      "findings": string[],
      "technicalSkills": string[],
      "softSkills": string[]
    },
    "projects": {
      "score": number (0-100),
      "status": "good" | "needs_improvement" | "poor",
      "findings": string[],
      "items": [
        {
          "title": string,
          "technologies": string[],
          "problemSolved": string,
          "role": string,
          "impact": string,
          "metricsPresent": boolean
        }
      ]
    },
    "experience": {
      "score": number (0-100),
      "status": "good" | "needs_improvement" | "poor",
      "findings": string[],
      "items": [
        {
          "title": string,
          "company": string,
          "duration": string,
          "responsibilities": string[],
          "quantifiableResults": string[]
        }
      ]
    },
    "certifications": {
      "score": number (0-100),
      "status": "good" | "needs_improvement" | "poor",
      "findings": string[],
      "items": string[]
    }
  },
  "recommendations": [
    {
      "category": string,
      "before": string,
      "suggestion": string,
      "reason": string
    }
  ],
  "improvedSummary": string
}`;

    const geminiResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3,
      },
    });

    const responseText = geminiResponse.text?.trim() || '';

    if (!responseText) {
      throw new Error('Empty response received from Gemini');
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(responseText);
    } catch (parseError) {
      // Attempt clean markdown block if present
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleaned);
    }

    // Add metadata
    parsedResult.id = 'analysis-' + Date.now();
    parsedResult.fileName = fileName || 'Uploaded_Resume.pdf';
    parsedResult.fileSize = fileSize || 0;
    parsedResult.targetJobRole = jobRole;
    parsedResult.jobDescription = jobDescription || '';
    parsedResult.analyzedAt = new Date().toISOString();
    parsedResult.isDemo = false;
    parsedResult.extractedText = resumeText;

    res.json(parsedResult);
  } catch (error: any) {
    console.error('Gemini Resume Analysis error:', error);
    res.status(500).json({
      error: 'Resume analysis failed: ' + (error?.message || 'Server error occurred during AI evaluation.'),
    });
  }
});

// Section improvement endpoint
app.post('/api/improve-section', async (req: Request, res: Response) => {
  try {
    const { sectionType, originalText, targetJobRole } = req.body;

    if (!originalText || originalText.trim().length < 5) {
      return res.status(400).json({ error: 'Please provide original text to improve.' });
    }

    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured for section rewriting.',
      });
    }

    const prompt = `You are a resume writing expert.
Target Role: "${targetJobRole || 'Software Professional'}"
Section: "${sectionType || 'Work Experience / Projects'}"

Original Text:
"""
${originalText}
"""

Task:
Rewrite and elevate this section to be high-impact, ATS-optimized, and professionally compelling.
IMPORTANT RULES:
1. Preserve 100% of the true facts. Do NOT invent companies, metrics that weren't implied, or new degrees.
2. Use strong action verbs (Architected, Engineered, Speared, Implemented, Streamlined, Accelerated).
3. If bullet points, format with clear dashes.
4. Return ONLY a JSON object:
{
  "improvedText": "the rewritten text",
  "keyImprovements": ["point 1", "point 2"],
  "tips": "additional advice"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || '{}');
    res.json(parsed);
  } catch (error: any) {
    console.error('Section improvement error:', error);
    res.status(500).json({
      error: error?.message || 'Failed to improve section with AI.',
    });
  }
});

// Vite middleware & Production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
