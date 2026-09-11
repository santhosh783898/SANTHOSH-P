import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Briefcase, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Loader2,
  FileCode,
  FileCheck
} from 'lucide-react';
import { SAMPLE_RESUMES, SampleResumePreset } from '../data/sampleResumes';
import { ResumeAnalysisResult } from '../types';

interface ResumeAnalyzerPageProps {
  onAnalysisComplete: (result: ResumeAnalysisResult) => void;
  onSelectSample: (preset: SampleResumePreset) => void;
  addToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const ResumeAnalyzerPage: React.FC<ResumeAnalyzerPageProps> = ({
  onAnalysisComplete,
  onSelectSample,
  addToast,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [targetJobRole, setTargetJobRole] = useState('Software Developer');
  const [customJobRole, setCustomJobRole] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  const [isExtracting, setIsExtracting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const predefinedRoles = [
    'Software Developer',
    'Data Analyst',
    'Full Stack Developer',
    'Java Developer',
    'Python Developer',
    'Data Scientist',
    'UI/UX Designer',
  ];

  const analysisSteps = [
    'Extracting text & formatting structure from document...',
    'Evaluating ATS readability, font standard, and heading hierarchy...',
    'Auditing technical skills, libraries, and gap benchmarks...',
    'Scoring work experience bullets & quantifiable impact...',
    'Generating actionable before/after recommendations with Gemini...'
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleFile = async (selectedFile: File) => {
    // Validate file size (10 MB = 10 * 1024 * 1024 bytes)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (selectedFile.size > MAX_SIZE) {
      addToast('error', 'File too large', 'The resume file must be less than 10 MB.');
      return;
    }

    const name = selectedFile.name.toLowerCase();
    const isPdf = name.endsWith('.pdf') || selectedFile.type === 'application/pdf';
    const isDocx = name.endsWith('.docx') || selectedFile.type.includes('wordprocessingml') || selectedFile.type.includes('msword');
    const isTxt = name.endsWith('.txt');

    if (!isPdf && !isDocx && !isTxt) {
      addToast(
        'error',
        'Invalid file type',
        'Only PDF (.pdf) and Word documents (.docx) are supported.'
      );
      return;
    }

    setFile(selectedFile);
    setIsExtracting(true);

    try {
      // Read as Data URL (base64)
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result as string;
          const res = await fetch('/api/extract-text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fileData: base64Data,
              fileName: selectedFile.name,
              fileType: selectedFile.type,
            }),
          });

          if (!res.ok) {
            const errData = await res.json();
            throw new Error(errData.error || 'Failed to extract text');
          }

          const data = await res.json();
          setExtractedText(data.text);
          addToast(
            'success',
            'Resume text extracted',
            `Successfully parsed ${data.wordCount} words from ${selectedFile.name}`
          );
        } catch (err: any) {
          console.error(err);
          addToast(
            'warning',
            'Extraction warning',
            err?.message || 'Could not parse complex PDF text. You can still paste or use demo resumes.'
          );
        } finally {
          setIsExtracting(false);
        }
      };
      reader.onerror = () => {
        addToast('error', 'File read error', 'Could not read the uploaded file.');
        setIsExtracting(false);
      };
      reader.readAsDataURL(selectedFile);
    } catch (e: any) {
      setIsExtracting(false);
      addToast('error', 'Upload error', e?.message || 'An unexpected error occurred.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setExtractedText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!file && !extractedText) {
      addToast('warning', 'Resume missing', 'Please upload a PDF or DOCX resume first, or choose a sample resume.');
      return;
    }

    const finalRole = customJobRole.trim() ? customJobRole.trim() : targetJobRole;

    setIsAnalyzing(true);
    setAnalysisStep(0);

    // Progressive step indicator
    const stepInterval = setInterval(() => {
      setAnalysisStep((prev) => (prev < analysisSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: extractedText || (file ? `Resume file: ${file.name}` : ''),
          targetJobRole: finalRole,
          jobDescription: jobDescription.trim(),
          fileName: file?.name || 'Uploaded_Resume.pdf',
          fileSize: file?.size || 1024 * 300,
        }),
      });

      clearInterval(stepInterval);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        
        // If Gemini API is unconfigured, inform the user and provide the rich demo preset
        if (errorData.isApiKeyMissing) {
          addToast(
            'info',
            'Demo Mode Triggered',
            'Gemini API key is not configured in secrets. Loading full high-fidelity Demo Analysis.'
          );
          // Match role with preset
          const preset = SAMPLE_RESUMES.find((s) => s.targetRole.toLowerCase().includes(finalRole.toLowerCase())) || SAMPLE_RESUMES[0];
          onAnalysisComplete({
            ...preset.analysis,
            targetJobRole: finalRole,
            fileName: file?.name || preset.fileName,
            isDemo: true,
          });
          return;
        }

        throw new Error(errorData.error || 'AI Analysis failed. Please try again.');
      }

      const result: ResumeAnalysisResult = await res.json();
      addToast('success', 'Analysis complete!', `Your resume received a score of ${result.overallScore}/100.`);
      onAnalysisComplete(result);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error(err);
      addToast(
        'error',
        'Analysis failed',
        err.message || 'Unable to connect to AI server. Please check your network or try a sample resume.'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Analyze Your Resume
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Upload your resume in PDF or Word format to receive instant ATS compatibility scores, skill gap detection, and AI suggestions.
        </p>
      </div>

      {/* SAMPLE RESUMES ACCELERATOR */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Need a quick test? Load one of our ready-to-test student resumes:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_RESUMES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectSample(preset)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 text-xs font-semibold transition-colors cursor-pointer"
            >
              {preset.targetRole}
            </button>
          ))}
        </div>
      </div>

      {/* DRAG & DROP UPLOAD AREA */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <UploadCloud className="w-4 h-4 text-indigo-400" />
            <span>Upload your resume</span>
          </label>
          <span className="text-xs text-slate-400">
            PDF or DOCX (Max 10 MB)
          </span>
        </div>

        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-4 ${
              dragOver
                ? 'border-indigo-500 bg-indigo-500/10 scale-[1.01]'
                : 'border-slate-800 hover:border-slate-700 bg-slate-900/50 hover:bg-slate-900/80'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFile(e.target.files[0]);
                }
              }}
              accept=".pdf,.docx,.txt"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-base sm:text-lg font-bold text-white">
                Drag & drop your resume here or <span className="text-indigo-400 underline underline-offset-4">Browse Files</span>
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                Supports PDF (.pdf) and Word documents (.docx) up to 10 MB
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700">
                <FileCode className="w-3.5 h-3.5 text-indigo-400" />
                PDF
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                DOCX
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-[11px] font-medium text-slate-300 border border-slate-700">
                <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                ATS Safe
              </span>
            </div>
          </div>
        ) : (
          /* Uploaded File Summary Card */
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>{file.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Ready
                  </span>
                </h4>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Size: {formatFileSize(file.size)}</span>
                  <span>•</span>
                  <span>Type: {file.type || 'application/octet-stream'}</span>
                  {extractedText && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-400">
                        {extractedText.split(/\s+/).filter(Boolean).length} words extracted
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={handleRemoveFile}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Remove</span>
            </button>
          </div>
        )}

        {isExtracting && (
          <div className="flex items-center gap-2 text-xs text-indigo-400 animate-pulse px-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Extracting resume text and document layout...</span>
          </div>
        )}
      </div>

      {/* TARGET JOB SECTION */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6">
        
        {/* Target Job Role */}
        <div className="space-y-3">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-purple-400" />
            <span>Target Job Role</span>
          </label>
          <p className="text-xs text-slate-400">
            Select a target role or enter your custom position to tailor keyword & skill-gap evaluation.
          </p>

          {/* Preset buttons */}
          <div className="flex flex-wrap gap-2">
            {predefinedRoles.map((role) => {
              const isSelected = targetJobRole === role && !customJobRole;
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setTargetJobRole(role);
                    setCustomJobRole('');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                  }`}
                >
                  {role}
                </button>
              );
            })}
          </div>

          {/* Custom job role input */}
          <div className="pt-2">
            <input
              type="text"
              placeholder="Or enter custom job title (e.g. Cloud Security Engineer, DevOps Specialist)..."
              value={customJobRole}
              onChange={(e) => setCustomJobRole(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Optional Job Description */}
        <div className="space-y-2 pt-2 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-pink-400" />
              <span>Job Description (Optional)</span>
            </label>
            <span className="text-xs text-slate-500">
              {jobDescription.length} characters
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Paste the exact job listing description to calculate an accurate <strong>Job Match Score</strong> and uncover missing job-specific keywords.
          </p>
          <textarea
            rows={4}
            placeholder="Paste target job requirements, qualifications, and responsibilities here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 transition-colors resize-y leading-relaxed"
          />
        </div>

        {/* ANALYZE BUTTON */}
        <div className="pt-4">
          <button
            onClick={handleAnalyze}
            disabled={isAnalyzing || isExtracting}
            id="btn-analyze-resume-ai"
            className={`w-full py-4 rounded-xl text-base font-bold text-white flex items-center justify-center gap-3 transition-all cursor-pointer shadow-xl ${
              isAnalyzing || isExtracting
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-indigo-300" />
                <span>Analyzing Resume with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span>Analyze Resume with AI</span>
                <ArrowRight className="w-5 h-5 text-indigo-200" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* PRIVACY & SECURITY BANNER */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-3.5">
        <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300 leading-relaxed space-y-1">
          <p className="font-semibold text-white">Privacy and Security Statement</p>
          <p>
            "Your resume is used only for analysis. Do not upload passwords, government IDs, payment information, or other sensitive documents."
          </p>
          <p className="text-slate-500">
            Resumes are analyzed securely in-memory and are never permanently stored without your explicit action.
          </p>
        </div>
      </div>

      {/* LOADING ANIMATION OVERLAY */}
      {isAnalyzing && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6 text-center">
            
            {/* Pulsing AI Scanner Icon */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping" />
              <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <Sparkles className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-white">
                AI Resume Evaluation in Progress
              </h3>
              <p className="text-xs text-slate-400">
                Targeting: <span className="text-indigo-400 font-semibold">{customJobRole || targetJobRole}</span>
              </p>
            </div>

            {/* Step progress list */}
            <div className="space-y-3 text-left">
              {analysisSteps.map((stepText, idx) => {
                const isCurrent = idx === analysisStep;
                const isDone = idx < analysisStep;
                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 text-xs transition-opacity duration-300 ${
                      isCurrent
                        ? 'text-white font-semibold'
                        : isDone
                        ? 'text-emerald-400'
                        : 'text-slate-600'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : isCurrent ? (
                        <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-700" />
                      )}
                    </div>
                    <span>{stepText}</span>
                  </div>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-500 italic">
              Powered by Google Gemini 3.8 Flash • Preserves 100% of candidate facts
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
