import React, { useState, useEffect } from 'react';
import { ActiveTab, ResumeAnalysisResult } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ResumeAnalyzerPage } from './components/ResumeAnalyzerPage';
import { Dashboard } from './components/Dashboard';
import { SectionAnalysisPage } from './components/SectionAnalysisPage';
import { ResumeImprovementPage } from './components/ResumeImprovementPage';
import { HistoryPage } from './components/HistoryPage';
import { AboutPage } from './components/AboutPage';
import { ToastContainer, ToastMessage } from './components/Toast';
import { 
  getCurrentAnalysis, 
  saveCurrentAnalysis, 
  loadAnalysisHistory, 
  saveAnalysisToHistory, 
  deleteAnalysisFromHistory, 
  clearAnalysisHistory 
} from './utils/storage';
import { SampleResumePreset } from './data/sampleResumes';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [currentAnalysis, setCurrentAnalysis] = useState<ResumeAnalysisResult | null>(null);
  const [history, setHistory] = useState<ResumeAnalysisResult[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Initialize from LocalStorage
  useEffect(() => {
    const savedCurrent = getCurrentAnalysis();
    if (savedCurrent) {
      setCurrentAnalysis(savedCurrent);
    }
    const savedHistory = loadAnalysisHistory();
    setHistory(savedHistory);
  }, []);

  const addToast = (
    type: 'success' | 'warning' | 'error' | 'info',
    title: string,
    message?: string
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAnalysisComplete = (result: ResumeAnalysisResult) => {
    setCurrentAnalysis(result);
    saveCurrentAnalysis(result);
    const updatedHistory = saveAnalysisToHistory(result);
    setHistory(updatedHistory);
    setActiveTab('dashboard');
  };

  const handleSelectSample = (preset: SampleResumePreset) => {
    const sampleResult: ResumeAnalysisResult = {
      ...preset.analysis,
      fileName: preset.fileName,
      targetJobRole: preset.targetRole,
      isDemo: true,
      analyzedAt: new Date().toISOString(),
    };

    setCurrentAnalysis(sampleResult);
    saveCurrentAnalysis(sampleResult);
    const updatedHistory = saveAnalysisToHistory(sampleResult);
    setHistory(updatedHistory);
    setActiveTab('dashboard');
    addToast(
      'success',
      `Loaded "${preset.name}"`,
      `Testing with ${preset.targetRole} preset (Score: ${sampleResult.overallScore}/100)`
    );
  };

  const handleDeleteHistoryItem = (id: string) => {
    const updated = deleteAnalysisFromHistory(id);
    setHistory(updated);
    if (currentAnalysis?.id === id) {
      setCurrentAnalysis(null);
    }
    addToast('info', 'Record removed', 'Analysis removed from history.');
  };

  const handleClearAllHistory = () => {
    clearAnalysisHistory();
    setHistory([]);
    setCurrentAnalysis(null);
    addToast('info', 'History Cleared', 'All stored analysis records have been deleted.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white font-sans antialiased">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
        onSelectSample={handleSelectSample}
        hasCurrentAnalysis={!!currentAnalysis}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onStartAnalyze={() => setActiveTab('analyzer')}
            onSelectSample={handleSelectSample}
          />
        )}

        {activeTab === 'analyzer' && (
          <ResumeAnalyzerPage
            onAnalysisComplete={handleAnalysisComplete}
            onSelectSample={handleSelectSample}
            addToast={addToast}
          />
        )}

        {activeTab === 'dashboard' && currentAnalysis && (
          <Dashboard
            analysis={currentAnalysis}
            onNavigateTab={setActiveTab}
            addToast={addToast}
          />
        )}

        {activeTab === 'sections' && currentAnalysis && (
          <SectionAnalysisPage
            analysis={currentAnalysis}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'improve' && (
          <ResumeImprovementPage
            analysis={currentAnalysis}
            onNavigateTab={setActiveTab}
            addToast={addToast}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage
            history={history}
            onSelectResult={(res) => {
              setCurrentAnalysis(res);
              saveCurrentAnalysis(res);
              setActiveTab('dashboard');
              addToast('info', 'Result Loaded', `Loaded analysis for ${res.fileName}`);
            }}
            onDeleteResult={handleDeleteHistoryItem}
            onClearHistory={handleClearAllHistory}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Global Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
