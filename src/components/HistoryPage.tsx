import React from 'react';
import { ResumeAnalysisResult, ActiveTab } from '../types';
import { 
  History, 
  Trash2, 
  ExternalLink, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  RotateCcw,
  Clock,
  Briefcase
} from 'lucide-react';
import { ScoreCircle } from './ScoreCircle';

interface HistoryPageProps {
  history: ResumeAnalysisResult[];
  onSelectResult: (result: ResumeAnalysisResult) => void;
  onDeleteResult: (id: string) => void;
  onClearHistory: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  history,
  onSelectResult,
  onDeleteResult,
  onClearHistory,
  onNavigateTab,
}) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-indigo-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Analysis History
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse and reload your past resume scans stored securely in your browser.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all analysis history?')) {
                onClearHistory();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All History</span>
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="p-12 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">No Analysis History Yet</h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
            You haven't analyzed any resumes yet. Upload a resume or select a sample preset to view past records here.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onNavigateTab('analyzer')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Analyze a Resume Now
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg group"
            >
              {/* Left Details */}
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                <div className="shrink-0">
                  <ScoreCircle
                    score={item.overallScore}
                    size={68}
                    strokeWidth={6}
                    sublabel="Score"
                  />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-bold text-white truncate max-w-xs sm:max-w-md">
                      {item.fileName}
                    </h3>
                    {item.isDemo && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        Demo
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                    <span className="flex items-center gap-1 text-indigo-300">
                      <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{item.targetJobRole}</span>
                    </span>
                    <span>•</span>
                    <span>ATS Score: {item.atsScore}%</span>
                    <span>•</span>
                    <span>Job Match: {item.jobMatchScore}%</span>
                    <span>•</span>
                    <span>{new Date(item.analyzedAt).toLocaleDateString()}</span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-1 pt-0.5">
                    {item.strengths?.[0] || 'Clean resume layout with technical foundations.'}
                  </p>
                </div>
              </div>

              {/* Right Action buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => onSelectResult(item)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 hover:border-transparent text-xs font-semibold transition-all cursor-pointer"
                >
                  <span>Reopen Results</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onDeleteResult(item.id)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-500/30 transition-colors cursor-pointer"
                  title="Delete from history"
                  aria-label="Delete analysis"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
