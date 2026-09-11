import React from 'react';
import { 
  FileCheck2, 
  Search, 
  Sparkles, 
  Target, 
  Cpu, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  ShieldCheck, 
  FileText,
  Zap,
  Award,
  Bot
} from 'lucide-react';
import { SAMPLE_RESUMES, SampleResumePreset } from '../data/sampleResumes';

interface HomePageProps {
  onStartAnalyze: () => void;
  onSelectSample: (preset: SampleResumePreset) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onStartAnalyze, onSelectSample }) => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featureCards = [
    {
      icon: <FileCheck2 className="w-6 h-6 text-emerald-400" />,
      title: 'ATS Score',
      desc: 'Simulate modern Applicant Tracking Systems to catch layout traps, table parsing glitches, and missing critical keywords before recruiters do.',
      tag: 'ATS V4.2 Compatibility'
    },
    {
      icon: <Search className="w-6 h-6 text-indigo-400" />,
      title: 'Resume Analysis',
      desc: 'Deep multi-section audit across Contact Info, Education, Experience, Technical Skills, Projects, and Certifications.',
      tag: '7 Core Sections'
    },
    {
      icon: <Layers className="w-6 h-6 text-purple-400" />,
      title: 'Skill Gap Detection',
      desc: 'Extract your demonstrated technical and soft skills, and compare them against actual market demands to highlight missing credentials.',
      tag: 'Market Benchmark'
    },
    {
      icon: <Target className="w-6 h-6 text-pink-400" />,
      title: 'Job Match Score',
      desc: 'Paste any target job description or role to calculate precision percentage alignment with keyword intersection maps.',
      tag: 'Role Alignment'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      title: 'AI Suggestions',
      desc: 'Receive actionable Before vs Suggestion bullet points that transform passive statements into high-impact, quantified accomplishments.',
      tag: 'Concrete Rewrites'
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-cyan-400" />,
      title: 'Resume Improvement',
      desc: 'Interactive AI rewriting engine that elevates summaries and project descriptions while strictly preserving 100% factual accuracy.',
      tag: 'Instant Copy Tool'
    }
  ];

  const howItWorksSteps = [
    {
      step: '01',
      title: 'Upload Resume',
      desc: 'Drag & drop your resume in PDF or DOCX format (up to 10MB). Fast, secure, and client-safe parsing.',
      icon: <FileText className="w-6 h-6 text-indigo-400" />
    },
    {
      step: '02',
      title: 'Select Job Role',
      desc: 'Choose your target role (Software Developer, Data Analyst, etc.) or paste the exact job description for tailored scrutiny.',
      icon: <Target className="w-6 h-6 text-purple-400" />
    },
    {
      step: '03',
      title: 'AI Analyzes Resume',
      desc: 'Gemini evaluates structural compliance, action verb strength, measurable metrics, and ATS readability.',
      icon: <Cpu className="w-6 h-6 text-pink-400" />
    },
    {
      step: '04',
      title: 'Get Recommendations',
      desc: 'Inspect scores, copy refined bullet points, fix critical red flags, and download a comprehensive action plan.',
      icon: <Award className="w-6 h-6 text-emerald-400" />
    }
  ];

  const stats = [
    {
      value: '98%',
      label: 'ATS Analysis',
      sub: 'Filter & layout compatibility verification'
    },
    {
      value: '25+',
      label: 'AI-Powered Insights',
      sub: 'Action verb & metric strength scoring'
    },
    {
      value: '100%',
      label: 'Skill Recommendations',
      sub: 'Tailored gap analysis for your dream role'
    },
    {
      value: '1-Click',
      label: 'Job Matching',
      sub: 'Instant job description comparison matrix'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-indigo-300 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                <span>Powered by Gemini 3.8 AI & Modern ATS Parsers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Make Your Resume <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                  Job-Ready with AI
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Upload your resume, get an instant AI-powered analysis, and discover exactly how to improve your chances of getting shortlisted.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={onStartAnalyze}
                  id="hero-analyze-btn"
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-base"
                >
                  <span>Analyze My Resume</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={scrollToHowItWorks}
                  id="hero-how-it-works-btn"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 hover:text-white transition-all cursor-pointer text-base"
                >
                  <span>How It Works</span>
                </button>
              </div>

              {/* Trust highlights */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>PDF & DOCX Supported</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  <span>100% Privacy Safeguarded</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-purple-400" />
                  <span>No Hallucinated Experience</span>
                </div>
              </div>
            </div>

            {/* Right: Modern Resume & AI Scanner Mockup Illustration */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Glow accent */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-100 transition duration-1000"></div>

                {/* Main Card Container */}
                <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-5">
                  
                  {/* Card Header with simulated scanner */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-2">resume_audit_report.json</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live AI Audit
                    </span>
                  </div>

                  {/* Score Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-[11px] text-slate-400 font-medium">Overall Score</div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-extrabold text-emerald-400">84</span>
                        <span className="text-xs text-slate-500 font-semibold">/100</span>
                      </div>
                      <div className="text-[10px] text-emerald-400/90 font-medium mt-1">Job-Ready Candidate</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <div className="text-[11px] text-slate-400 font-medium">ATS Match</div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-3xl font-extrabold text-indigo-400">88%</span>
                      </div>
                      <div className="text-[10px] text-indigo-400/90 font-medium mt-1">High System Readability</div>
                    </div>
                  </div>

                  {/* Simulated Resume Scanner Content */}
                  <div className="space-y-2.5 p-3 rounded-xl bg-slate-950/40 border border-slate-800/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">Alex Chen — Software Developer</span>
                      <span className="text-[10px] text-slate-400">B.S. Computer Science</span>
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-1.5 pt-1">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                          <span>Quantified Project Impact</span>
                          <span className="text-emerald-400 font-semibold">92%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[92%] h-full bg-emerald-500 rounded-full" />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                          <span>Keyword Density (Java, React, SQL)</span>
                          <span className="text-indigo-400 font-semibold">85%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="w-[85%] h-full bg-indigo-500 rounded-full" />
                        </div>
                      </div>
                    </div>

                    {/* Skill chips */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">
                        ✓ Java & Python
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-medium">
                        ✓ PostgreSQL
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-medium">
                        + Recommended: AWS CI/CD
                      </span>
                    </div>
                  </div>

                  {/* AI Instant Rewrite Snippet */}
                  <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 text-xs space-y-1.5">
                    <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-[11px]">
                      <Zap className="w-3.5 h-3.5" />
                      <span>AI Rewriter Suggestion</span>
                    </div>
                    <p className="text-[11px] text-slate-300 italic line-clamp-2">
                      "Engineered a scalable student portal serving 1,500+ active users and reduced PostgreSQL query latency by 35%."
                    </p>
                  </div>

                  {/* Card footer CTA */}
                  <button
                    onClick={() => onSelectSample(SAMPLE_RESUMES[0])}
                    className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-indigo-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Load this sample report into Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SAMPLE PRESETS QUICK LAUNCH BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-semibold">
                  Instant Test Drive
                </span>
                <h3 className="text-lg font-bold text-white">Don't have your resume ready right now?</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Click any pre-loaded college student resume to test the full analysis dashboard and AI tools immediately.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {SAMPLE_RESUMES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => onSelectSample(sample)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-indigo-600/30 border border-slate-700 hover:border-indigo-500/50 text-xs font-medium text-white transition-all cursor-pointer group"
                >
                  <FileText className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  <span>{sample.targetRole} Resume</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center hover:border-slate-700 transition-colors"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-white mt-1">{stat.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURE CARDS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-2">
            Engineered For Modern Hiring
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Comprehensive Resume Intelligence
          </h3>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Every critical dimension measured by tech recruiters and automated screeners, unified into one intuitive dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/90 hover:border-indigo-500/40 hover:bg-slate-900 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/90 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 px-2.5 py-1 rounded-full bg-slate-800/60 border border-slate-700/60">
                    {feat.tag}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {feat.desc}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
                <span>View capabilities</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">
            Simple 4-Step Process
          </h2>
          <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How It Works
          </h3>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Get comprehensive recruiter feedback and measurable improvements in under 15 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {howItWorksSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800/80 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-2xl font-extrabold text-slate-700 font-mono">
                    {step.step}
                  </span>
                </div>

                <h4 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs text-indigo-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Instant automated step</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA bottom */}
        <div className="mt-12 text-center">
          <button
            onClick={onStartAnalyze}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-base"
          >
            <span>Analyze Your Resume Now</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* PRIVACY & ETHICS PROMISE */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg text-center space-y-3">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-400 mx-auto">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="text-base sm:text-lg font-bold text-white">Student & Job Seeker Privacy Promise</h4>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            "Your resume is used only for analysis. Do not upload passwords, government IDs, payment information, or other sensitive documents."
          </p>
          <p className="text-xs text-slate-500">
            Files are processed ephemerally for the duration of the audit. Analysis history is retained privately in your browser's local storage.
          </p>
        </div>
      </section>
    </div>
  );
};
