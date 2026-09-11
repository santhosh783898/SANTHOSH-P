import { ResumeAnalysisResult, HistoryItem } from '../types';

const STORAGE_KEY_HISTORY = 'ai_resume_analyzer_history_v1';
const STORAGE_KEY_CURRENT = 'ai_resume_analyzer_current_v1';

export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_HISTORY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load history from localStorage', e);
    return [];
  }
}

export function loadAnalysisHistory(): ResumeAnalysisResult[] {
  try {
    const historyList = getHistory();
    const results: ResumeAnalysisResult[] = [];
    for (const item of historyList) {
      const full = getAnalysisById(item.id);
      if (full) {
        results.push(full);
      } else {
        // Fallback reconstructed partial
        results.push({
          id: item.id,
          fileName: item.fileName,
          fileSize: 1024 * 300,
          targetJobRole: item.targetJobRole,
          overallScore: item.overallScore,
          atsScore: item.atsScore,
          jobMatchScore: item.jobMatchScore,
          contentScore: 80,
          skillsScore: 80,
          experienceScore: 80,
          educationScore: 85,
          formattingScore: 85,
          keywordScore: 80,
          strengths: ['Standard resume structure detected.'],
          weaknesses: ['Add more quantified metrics.'],
          skillsFound: [],
          recommendedSkills: [],
          matchingKeywords: [],
          missingKeywords: [],
          recommendations: [],
          atsDetails: {
            isAtsFriendly: true,
            scoreExplanation: 'Standard resume structure detected.',
            formattingIssues: [],
            tableColumnIssues: [],
            headingIssues: [],
            contactIssues: [],
            keywordUsage: 'Solid baseline keyword alignment with role.',
          },
          sectionAnalysis: {},
          improvedSummary: '',
          analyzedAt: item.analyzedAt,
          isDemo: item.isDemo,
        });
      }
    }
    return results;
  } catch (e) {
    console.error('Failed to load full analysis history', e);
    return [];
  }
}

export function saveToHistory(analysis: ResumeAnalysisResult): void {
  try {
    const history = getHistory();
    const filtered = history.filter((item) => item.id !== analysis.id);

    const newItem: HistoryItem = {
      id: analysis.id,
      fileName: analysis.fileName,
      targetJobRole: analysis.targetJobRole,
      overallScore: analysis.overallScore,
      atsScore: analysis.atsScore,
      jobMatchScore: analysis.jobMatchScore,
      analyzedAt: analysis.analyzedAt,
      isDemo: analysis.isDemo,
    };

    const updated = [newItem, ...filtered].slice(0, 25);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
    localStorage.setItem(`resume_analysis_${analysis.id}`, JSON.stringify(analysis));
  } catch (e) {
    console.error('Failed to save history to localStorage', e);
  }
}

export function saveAnalysisToHistory(analysis: ResumeAnalysisResult): ResumeAnalysisResult[] {
  saveToHistory(analysis);
  return loadAnalysisHistory();
}

export function getAnalysisById(id: string): ResumeAnalysisResult | null {
  try {
    const raw = localStorage.getItem(`resume_analysis_${id}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error('Failed to load analysis from localStorage', e);
    return null;
  }
}

export function deleteHistoryItem(id: string): void {
  try {
    const history = getHistory().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    localStorage.removeItem(`resume_analysis_${id}`);
  } catch (e) {
    console.error('Failed to delete history item', e);
  }
}

export function deleteAnalysisFromHistory(id: string): ResumeAnalysisResult[] {
  deleteHistoryItem(id);
  return loadAnalysisHistory();
}

export function clearAllHistory(): void {
  try {
    const history = getHistory();
    history.forEach((item) => {
      localStorage.removeItem(`resume_analysis_${item.id}`);
    });
    localStorage.removeItem(STORAGE_KEY_HISTORY);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

export function clearAnalysisHistory(): void {
  clearAllHistory();
}

export function getCurrentAnalysis(): ResumeAnalysisResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setCurrentAnalysis(analysis: ResumeAnalysisResult | null): void {
  try {
    if (analysis) {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(analysis));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT);
    }
  } catch (e) {
    console.error('Failed to set current analysis', e);
  }
}

export function saveCurrentAnalysis(analysis: ResumeAnalysisResult | null): void {
  setCurrentAnalysis(analysis);
}
