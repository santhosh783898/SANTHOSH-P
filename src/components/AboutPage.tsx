import React from 'react';
import { 
  HelpCircle, 
  GraduationCap, 
  Cpu, 
  ShieldCheck, 
  FileCheck2, 
  CheckCircle2, 
  Code2, 
  Server, 
  Layout, 
  Sparkles 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const faqs = [
    {
      q: 'What makes a resume ATS-friendly?',
      a: 'ATS (Applicant Tracking Systems) prefer clean, single-column layouts with standard headings (Education, Experience, Projects, Skills), no complex graphics or nested tables, and standard fonts. Resumes must contain exact keyword matches for technologies mentioned in the job description.'
    },
    {
      q: 'How does this tool preserve factual accuracy?',
      a: 'The system strictly uses your uploaded credentials and experience as ground truth. The AI rewriter enhances vocabulary, action verbs, and quantifiable structure without fabricating unearned degrees, companies, or metrics.'
    },
    {
      q: 'Are my resume documents stored on a server?',
      a: 'No. File parsing is handled ephemerally in-memory during the audit. Your analysis history is saved only in your personal browser local storage and can be deleted at any time.'
    },
    {
      q: 'What is the best way to quantify college projects?',
      a: 'Instead of saying "Worked on a React website", frame it with action + tech + metric: "Engineered a responsive React & Node.js portal serving 1,200+ students, reducing campus event signup time by 40%."'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-indigo-400">
          <GraduationCap className="w-4 h-4" />
          <span>College Final-Year Project & Student Career Accelerator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          About AI Resume Analyzer
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Engineered to give college students, fresh graduates, and career changers an unfair advantage in the automated job search pipeline.
        </p>
      </div>

      {/* MISSION & ARCHITECTURE TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Gemini 3.8 AI Intelligence</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Evaluates syntax, phrasing impact, quantifiable achievement density, and structural clarity against industry hiring baselines.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
            <FileCheck2 className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Modern ATS Parsing Engine</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Simulates commercial ATS parsing routines (pdf-parse & mammoth) to catch unreadable columns, weird symbols, and missed headings.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Ethical & Fact-Safe</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Zero hallucinated work history. We empower candidate storytelling without fabricating false credentials or experience.
          </p>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE BREAKDOWN */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="pb-3 border-b border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <span>Technical Architecture</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Full-stack decoupled architecture designed for high security, low latency, and container deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-300">
          <div className="space-y-2">
            <span className="font-bold text-indigo-400 uppercase tracking-wider text-xs block">
              Frontend Layer
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">▹</span>
                <span><strong>React 18 & TypeScript:</strong> Type-safe interactive state machines and UI components.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">▹</span>
                <span><strong>Tailwind CSS:</strong> Polished dark SaaS aesthetic with high-contrast accessibility.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">▹</span>
                <span><strong>Canvas Confetti & SVG Meters:</strong> Real-time animated score progress indicators.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-indigo-400">▹</span>
                <span><strong>Browser Storage:</strong> Encrypted local storage for audit persistence and instant reopening.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-purple-400 uppercase tracking-wider text-xs block">
              Backend & AI Layer
            </span>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▹</span>
                <span><strong>Express & Node.js:</strong> Dedicated API endpoints for extraction and prompt engineering.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▹</span>
                <span><strong>@google/genai SDK:</strong> Server-side Gemini 3.8 Flash model invocation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▹</span>
                <span><strong>pdf-parse & mammoth:</strong> Raw buffer extraction for PDF and Word documents.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400">▹</span>
                <span><strong>esbuild & tsx:</strong> Single-bundle compilation for robust production deployment.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Crucial tips for conquering modern recruiting algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-indigo-300">{faq.q}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
