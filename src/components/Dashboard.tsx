import React, { useState, useEffect } from 'react';
import { ResumeAnalysisResult, ActiveTab } from '../types';
import { ScoreCircle } from './ScoreCircle';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Target, 
  FileText, 
  Copy, 
  Check, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Download,
  RotateCcw,
  Tag,
  BookOpen,
  Sliders
} from 'lucide-react';

interface DashboardProps {
  analysis: ResumeAnalysisResult;
  onNavigateTab: (tab: ActiveTab) => void;
  addToast: (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  analysis,
  onNavigateTab,
  addToast,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [dashboardView, setDashboardView] = useState<'all' | 'ats' | 'skills' | 'recommendations'>('all');

  useEffect(() => {
    // Fire festive confetti if score is solid!
    if (analysis.overallScore >= 80) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#6366F1', '#A855F7', '#10B981', '#F59E0B'],
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [analysis.id, analysis.overallScore]);

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    addToast('success', 'Copied to clipboard!', 'Suggestion text copied for your resume.');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const categoryScores = [
    { label: 'ATS Compatibility', score: analysis.atsScore, color: 'bg-emerald-500' },
    { label: 'Content Quality', score: analysis.contentScore, color: 'bg-indigo-500' },
    { label: 'Skills & Tech Stack', score: analysis.skillsScore, color: 'bg-purple-500' },
    { label: 'Experience & Impact', score: analysis.experienceScore, color: 'bg-blue-500' },
    { label: 'Education & Honors', score: analysis.educationScore, color: 'bg-teal-500' },
    { label: 'Formatting & Layout', score: analysis.formattingScore, color: 'bg-amber-500' },
    { label: 'Keyword Optimization', score: analysis.keywordScore, color: 'bg-pink-500' },
  ];

  const getScoreVerdict = (score: number) => {
    if (score >= 85) return { text: 'Job Ready & Highly Competitive', color: 'text-emerald-400', badge: 'Top Tier' };
    if (score >= 75) return { text: 'Strong Resume with Polish Opportunities', color: 'text-blue-400', badge: 'Competitive' };
    if (score >= 60) return { text: 'Moderate Match — Key Gaps to Fix', color: 'text-amber-400', badge: 'Needs Work' };
    return { text: 'Critical Formatting & Keyword Deficiencies', color: 'text-rose-400', badge: 'Low Match' };
  };

  const verdict = getScoreVerdict(analysis.overallScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 print:p-0 print:space-y-4">
      
      {/* TOP BANNER WITH RESUME METADATA & ACTIONS */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Audit Complete
            </span>
            {analysis.isDemo && (
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Demo Analysis
              </span>
            )}
            <span className="text-xs text-slate-400">
              Analyzed {new Date(analysis.analyzedAt).toLocaleDateString()}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-2 flex items-center gap-2">
            <FileText className="w-7 h-7 text-indigo-400" />
            <span>{analysis.fileName}</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluated for target role: <strong className="text-indigo-300 font-semibold">{analysis.targetJobRole}</strong>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          <button
            onClick={() => onNavigateTab('sections')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors cursor-pointer"
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>Section Breakdown</span>
          </button>

          <button
            onClick={() => onNavigateTab('improve')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-xs font-semibold text-purple-300 border border-purple-500/30 transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>AI Rewriter</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save</span>
          </button>

          <button
            onClick={() => onNavigateTab('analyzer')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Analysis</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD VIEW SWITCHER FILTER */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto print:hidden">
        <span className="text-xs text-slate-400 font-medium mr-2 flex items-center gap-1.5 shrink-0">
          <Sliders className="w-3.5 h-3.5 text-indigo-400" />
          <span>Dashboard View:</span>
        </span>
        {[
          { id: 'all', label: 'Complete Overview' },
          { id: 'ats', label: 'ATS Breakdown' },
          { id: 'skills', label: 'Skills & Match Gap' },
          { id: 'recommendations', label: 'AI Actionable Rewrites' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDashboardView(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0 ${
              dashboardView === tab.id
                ? 'bg-indigo-600 text-white shadow'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: OVERALL RESUME SCORE & CATEGORY SCORES */}
      {(dashboardView === 'all' || dashboardView === 'ats') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Overall Score Card (5 cols) */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-indigo-400" />
                  <span>Overall Resume Score</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  {verdict.badge}
                </span>
              </div>

              <div className="py-6 flex flex-col items-center justify-center">
                <ScoreCircle
                  score={analysis.overallScore}
                  size={160}
                  strokeWidth={12}
                  showGrade={true}
                  sublabel="Score"
                />
                <div className={`mt-3 text-sm font-bold text-center ${verdict.color}`}>
                  {verdict.text}
                </div>
              </div>
            </div>

            {/* Quick summary metrics */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800/80 text-center">
              <div className="p-2.5 rounded-xl bg-slate-950/70">
                <div className="text-[11px] text-slate-400">ATS Pass Likelihood</div>
                <div className="text-lg font-extrabold text-emerald-400 mt-0.5">
                  {analysis.atsScore}%
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950/70">
                <div className="text-[11px] text-slate-400">Job Match Precision</div>
                <div className="text-lg font-extrabold text-indigo-400 mt-0.5">
                  {analysis.jobMatchScore}%
                </div>
              </div>
            </div>
          </div>

          {/* 7-Category Breakdown (7 cols) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span>Performance Breakdown by Category</span>
              </h3>
              <span className="text-xs text-slate-400">Scale: 0 – 100</span>
            </div>

            <div className="space-y-3.5 pt-1">
              {categoryScores.map((cat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-300">{cat.label}</span>
                    <span className="font-bold text-white">{cat.score} / 100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${cat.color}`}
                      style={{ width: `${Math.min(100, Math.max(0, cat.score))}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-500 pt-2 italic">
              Scores reflect structural formatting, keyword placement, verifiable technical depth, and quantifiable achievement density.
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: ATS SCORE & ATS AUDIT DETAILS */}
      {(dashboardView === 'all' || dashboardView === 'ats') && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold">
                  ATS Score: {analysis.atsScore}%
                </span>
                <span className="text-sm font-semibold text-white">
                  {analysis.atsDetails?.isAtsFriendly ? 'ATS Friendly' : 'ATS Warning: Formatting Traps Detected'}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed max-w-3xl">
                {analysis.atsDetails?.scoreExplanation || 'Your resume demonstrates standard headings and readable layout parsed accurately by enterprise ATS screeners.'}
              </p>
            </div>
            <div className="shrink-0">
              <ScoreCircle score={analysis.atsScore} size={84} strokeWidth={7} sublabel="ATS" />
            </div>
          </div>

          {/* ATS Specific Checkpoint Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Missing Keywords */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                <span>Missing ATS Keywords</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {analysis.missingKeywords?.length > 0 ? (
                  analysis.missingKeywords.slice(0, 5).map((kw, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                      {kw}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-emerald-400">No major keywords missing!</span>
                )}
              </div>
            </div>

            {/* 2. Tables & Multi-Columns */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Layout & Column Audit</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.atsDetails?.tableColumnIssues?.[0] || 'Single-column text blocks parsed cleanly. No unreadable graphic layers detected.'}
              </p>
            </div>

            {/* 3. Section Headings */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Section Heading Clarity</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.atsDetails?.headingIssues?.[0] || 'Clear, recognized industry headings (Education, Experience, Projects, Skills).'}
              </p>
            </div>

            {/* 4. Contact Information */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                <span>Contact Info Extraction</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {analysis.atsDetails?.contactIssues?.[0] || 'Email, phone, LinkedIn, and GitHub links detected and validated.'}
              </p>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 3: STRENGTHS & WEAKNESSES */}
      {dashboardView === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Strengths Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Resume Strengths</h3>
                <p className="text-xs text-slate-400">Key advantages noticed by technical screeners</p>
              </div>
            </div>

            <ul className="space-y-3">
              {analysis.strengths?.map((str, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weaknesses Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Resume Weaknesses & Gaps</h3>
                <p className="text-xs text-slate-400">Areas that lower interview callback probability</p>
              </div>
            </div>

            <ul className="space-y-3">
              {analysis.weaknesses?.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{weak}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SECTION 4: SKILL ANALYSIS & JOB MATCH SCORE */}
      {(dashboardView === 'all' || dashboardView === 'skills') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Skill Analysis (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>Skill Analysis & Market Comparison</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified technical proficiencies vs recommended market expectations
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Skill Match</span>
                <span className="text-lg font-bold text-emerald-400">{analysis.skillsScore}%</span>
              </div>
            </div>

            {/* Skills Found */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Skills Found in Your Resume ({analysis.skillsFound?.length || 0})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.skillsFound?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-medium"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Recommended Skills */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
                  Recommended Skills to Add for "{analysis.targetJobRole}" ({analysis.recommendedSkills?.length || 0})
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {analysis.recommendedSkills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-medium"
                  >
                    <Tag className="w-3 h-3 text-purple-400" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Job Match Score (4 cols) */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-pink-400" />
                <span>Job Match Score</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Alignment with {analysis.targetJobRole} specifications
              </p>

              <div className="py-4 flex flex-col items-center">
                <ScoreCircle
                  score={analysis.jobMatchScore}
                  size={120}
                  strokeWidth={9}
                  label="Role Alignment"
                />
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Matching Keywords:</span>
                  <span className="font-bold text-emerald-400">{analysis.matchingKeywords?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Missing Keywords:</span>
                  <span className="font-bold text-amber-400">{analysis.missingKeywords?.length || 0}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateTab('sections')}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
            >
              <span>Inspect All 7 Sections</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* SECTION 5: AI RECOMMENDATIONS (BEFORE VS AFTER) */}
      {(dashboardView === 'all' || dashboardView === 'recommendations') && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span>AI Actionable Recommendations</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Specific rewrite suggestions to transform passive bullet points into high-impact accomplishments.
              </p>
            </div>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              100% Fact Preserved
            </span>
          </div>

          <div className="space-y-4">
            {analysis.recommendations?.map((rec, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    {rec.category}
                  </span>
                  <button
                    onClick={() => handleCopyText(rec.suggestion, idx)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium transition-colors cursor-pointer"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Suggestion</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Before */}
                  <div className="p-3.5 rounded-lg bg-rose-950/20 border border-rose-900/30 space-y-1">
                    <span className="font-bold text-rose-400 uppercase tracking-wider text-[10px]">
                      Before (Original Text)
                    </span>
                    <p className="text-slate-300 italic leading-relaxed">
                      "{rec.before}"
                    </p>
                  </div>

                  {/* AI Suggestion */}
                  <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-900/30 space-y-1">
                    <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      AI Suggestion (Job-Ready)
                    </span>
                    <p className="text-emerald-100 font-medium leading-relaxed">
                      "{rec.suggestion}"
                    </p>
                  </div>
                </div>

                {rec.reason && (
                  <div className="text-[11px] text-slate-400 flex items-start gap-1.5 pt-1">
                    <strong className="text-slate-300">Why this helps:</strong>
                    <span>{rec.reason}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* AI Improved Summary Spotlight */}
          {analysis.improvedSummary && (
            <div className="p-5 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-indigo-950/40 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>AI Recommended Professional Summary</span>
                </span>
                <button
                  onClick={() => handleCopyText(analysis.improvedSummary, 999)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 text-xs font-medium transition-colors cursor-pointer"
                >
                  {copiedIndex === 999 ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy Summary</span>
                </button>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic">
                "{analysis.improvedSummary}"
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
