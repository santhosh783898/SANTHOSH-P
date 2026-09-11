import React, { useState } from 'react';
import { ActiveTab } from '../types';
import { 
  FileText, 
  Sparkles, 
  History, 
  HelpCircle, 
  UploadCloud, 
  Menu, 
  X, 
  Layers,
  ChevronDown
} from 'lucide-react';
import { SAMPLE_RESUMES, SampleResumePreset } from '../data/sampleResumes';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  historyCount: number;
  onSelectSample: (preset: SampleResumePreset) => void;
  hasCurrentAnalysis: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  historyCount,
  onSelectSample,
  hasCurrentAnalysis,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const navItems: { tab: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { tab: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { tab: 'analyzer', label: 'Analyze Resume', icon: <UploadCloud className="w-4 h-4" /> },
    ...(hasCurrentAnalysis
      ? [
          { tab: 'dashboard' as ActiveTab, label: 'Dashboard', icon: <FileText className="w-4 h-4" /> },
          { tab: 'sections' as ActiveTab, label: 'Sections', icon: <Layers className="w-4 h-4" /> },
          { tab: 'improve' as ActiveTab, label: 'AI Rewriter', icon: <Sparkles className="w-4 h-4 text-purple-400" /> },
        ]
      : []),
    { tab: 'history', label: `History (${historyCount})`, icon: <History className="w-4 h-4" /> },
    { tab: 'about', label: 'About', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 group-hover:shadow-indigo-500/40 transition-all">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">
                  AI Resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Analyzer</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  ATS Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400 -mt-0.5 hidden sm:block">
                For College Students & Job Seekers
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" id="nav-desktop-links">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-link-${item.tab}`}
                  onClick={() => setActiveTab(item.tab)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/15 text-indigo-300 border border-indigo-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Demo Presets Dropdown */}
            <div className="relative">
              <button
                type="button"
                id="btn-demo-dropdown"
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Try Demo Resumes</span>
                <ChevronDown className="w-3.5 h-3.5 text-purple-400" />
              </button>

              {demoDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl p-2 z-50"
                  id="demo-resumes-menu"
                >
                  <div className="px-2 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    Sample Presets (Ready to test)
                  </div>
                  {SAMPLE_RESUMES.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onSelectSample(preset);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-slate-800/80 transition-colors group cursor-pointer"
                    >
                      <div className="text-xs font-semibold text-white group-hover:text-indigo-300">
                        {preset.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {preset.tagline}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[10px] text-indigo-400">
                        <span>Score: {preset.analysis.overallScore}/100</span>
                        <span>•</span>
                        <span>ATS: {preset.analysis.atsScore}%</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <button
              onClick={() => setActiveTab('analyzer')}
              id="btn-nav-upload-cta"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 hover:bg-pos-100 shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Resume</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab('analyzer')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500"
            >
              Analyze
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === item.tab
                  ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-400 mb-2 px-1">
              Sample Resumes (Instant Test)
            </div>
            <div className="space-y-1">
              {SAMPLE_RESUMES.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectSample(preset);
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-slate-900 hover:text-indigo-400 flex items-center justify-between"
                >
                  <span>{preset.name}</span>
                  <span className="text-[10px] text-indigo-400 font-bold">{preset.analysis.overallScore}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
