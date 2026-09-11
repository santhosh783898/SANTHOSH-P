import React from 'react';
import { ActiveTab } from '../types';
import { FileText, Heart, ShieldCheck, Sparkles } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white">
                AI Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Analyzer</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Make Your Resume Job-Ready with AI. An AI-powered resume intelligence platform designed to help college students, fresh graduates, and career changers identify strengths, fix ATS formatting traps, and land interviews.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Safe • No permanent server file storage</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('home')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Home Page
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('analyzer')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Analyze Resume
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('history')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Analysis History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  About & FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Guidelines & Privacy Notice */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Privacy & Trust</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              "Your resume is used only for analysis. Do not upload passwords, government IDs, payment information, or other sensitive documents."
            </p>
            <div className="pt-2 text-[11px] text-purple-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Gemini 3.8 AI & ATS Parsers</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} AI Resume Analyzer. Built for College Students & Job Seekers.
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for final-year engineering project showcase</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
