import React, { useState } from 'react';
import { ResumeAnalysisResult, ActiveTab } from '../types';
import { 
  UserCheck, 
  Compass, 
  GraduationCap, 
  Cpu, 
  FolderGit2, 
  Briefcase, 
  Award,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface SectionAnalysisPageProps {
  analysis: ResumeAnalysisResult;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const SectionAnalysisPage: React.FC<SectionAnalysisPageProps> = ({
  analysis,
  onNavigateTab,
}) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    contactInfo: true,
    careerObjective: true,
    education: true,
    skills: true,
    projects: true,
    experience: true,
    certifications: true,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = analysis.sectionAnalysis || {};

  const getStatusBadge = (status: 'good' | 'needs_improvement' | 'poor' | undefined, score: number) => {
    if (status === 'good' || score >= 80) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Strong ({score}/100)</span>
        </span>
      );
    }
    if (status === 'needs_improvement' || score >= 60) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Needs Polish ({score}/100)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
        <XCircle className="w-3.5 h-3.5" />
        <span>Critical Attention ({score}/100)</span>
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resume Section Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Independent evaluation of all 7 key resume sections for <strong className="text-indigo-300">{analysis.targetJobRole}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateTab('dashboard')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
          >
            ← Back to Dashboard
          </button>
          <button
            onClick={() => onNavigateTab('improve')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-semibold text-white shadow-md shadow-purple-600/20 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Rewriter</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">

        {/* 1. CONTACT INFORMATION */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div
            onClick={() => toggleSection('contactInfo')}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">1. Contact Information</h3>
                <p className="text-xs text-slate-400">Name, Email, Phone, LinkedIn, GitHub, Location</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(sections.contactInfo?.status, sections.contactInfo?.score || 85)}
              {expandedSections.contactInfo ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {expandedSections.contactInfo && (
            <div className="p-5 pt-0 border-t border-slate-800/60 space-y-4">
              {/* Field Verification Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-3">
                {[
                  { label: 'Full Name', val: sections.contactInfo?.details?.name || 'Detected' },
                  { label: 'Email', val: sections.contactInfo?.details?.email || 'Present' },
                  { label: 'Phone', val: sections.contactInfo?.details?.phone || 'Present' },
                  { label: 'LinkedIn', val: sections.contactInfo?.details?.linkedin || 'Verified' },
                  { label: 'GitHub / Portfolio', val: sections.contactInfo?.details?.github || 'Verified' },
                  { label: 'Location (City, State)', val: sections.contactInfo?.details?.location || 'Standard format' },
                ].map((item, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">{item.label}</span>
                    <span className="text-slate-200 font-medium truncate block mt-0.5">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* Findings */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-bold text-slate-300">Auditor Notes:</span>
                <ul className="space-y-1">
                  {sections.contactInfo?.findings?.map((f, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-indigo-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 2. CAREER OBJECTIVE / SUMMARY */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div
            onClick={() => toggleSection('careerObjective')}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">2. Career Objective / Professional Summary</h3>
                <p className="text-xs text-slate-400">Relevance, clarity, length, and job-role alignment</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(sections.careerObjective?.status, sections.careerObjective?.score || 75)}
              {expandedSections.careerObjective ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {expandedSections.careerObjective && (
            <div className="p-5 pt-0 border-t border-slate-800/60 space-y-4">
              {sections.careerObjective?.summaryText && (
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 italic">
                  "{sections.careerObjective.summaryText}"
                </div>
              )}

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Auditor Notes:</span>
                <ul className="space-y-1">
                  {sections.careerObjective?.findings?.map((f, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-purple-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onNavigateTab('improve')}
                  className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer"
                >
                  <span>Rewrite this section with AI</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 3. EDUCATION */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div
            onClick={() => toggleSection('education')}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">3. Education & Honors</h3>
                <p className="text-xs text-slate-400">Degree, institution, graduation year, coursework, GPA</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(sections.education?.status, sections.education?.score || 90)}
              {expandedSections.education ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {expandedSections.education && (
            <div className="p-5 pt-0 border-t border-slate-800/60 space-y-4">
              <div className="space-y-3 pt-3">
                {sections.education?.entries?.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{edu.degree}</span>
                      <span className="text-teal-400">{edu.year}</span>
                    </div>
                    <div className="text-slate-300">{edu.institution} {edu.scoreOrGpa && `• ${edu.scoreOrGpa}`}</div>
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="pt-1 text-[11px] text-slate-400">
                        Coursework: {edu.coursework.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Auditor Notes:</span>
                <ul className="space-y-1">
                  {sections.education?.findings?.map((f, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-teal-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 4. SKILLS */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div
            onClick={() => toggleSection('skills')}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">4. Technical & Soft Skills</h3>
                <p className="text-xs text-slate-400">Languages, frameworks, databases, tools, soft skills</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(sections.skills?.status, sections.skills?.score || 85)}
              {expandedSections.skills ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {expandedSections.skills && (
            <div className="p-5 pt-0 border-t border-slate-800/60 space-y-4">
              <div className="pt-3 space-y-3">
                <div>
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                    Technical Skills ({sections.skills?.technicalSkills?.length || 0})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sections.skills?.technicalSkills?.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {sections.skills?.softSkills && sections.skills.softSkills.length > 0 && (
                  <div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      Demonstrated Soft Skills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sections.skills.softSkills.map((soft, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                          {soft}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Auditor Notes:</span>
                <ul className="space-y-1">
                  {sections.skills?.findings?.map((f, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 5. PROJECTS */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div
            onClick={() => toggleSection('projects')}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/15 text-pink-400 flex items-center justify-center">
                <FolderGit2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">5. Technical Projects</h3>
                <p className="text-xs text-slate-400">Problem solved, technologies, role, and measured results</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(sections.projects?.status, sections.projects?.score || 88)}
              {expandedSections.projects ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {expandedSections.projects && (
            <div className="p-5 pt-0 border-t border-slate-800/60 space-y-4">
              <div className="space-y-3 pt-3">
                {sections.projects?.items?.map((proj, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-white text-sm">
                      <span>{proj.title}</span>
                      {proj.metricsPresent && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          ✓ Metrics Included
                        </span>
                      )}
                    </div>
                    {proj.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {proj.technologies.map((t, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    {proj.impact && (
                      <p className="text-slate-300 leading-relaxed">
                        <strong className="text-slate-200">Impact:</strong> {proj.impact}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Auditor Notes:</span>
                <ul className="space-y-1">
                  {sections.projects?.findings?.map((f, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-pink-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 6. EXPERIENCE */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div
            onClick={() => toggleSection('experience')}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">6. Work Experience & Internships</h3>
                <p className="text-xs text-slate-400">Job title, company, responsibilities, quantifiable achievements</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(sections.experience?.status, sections.experience?.score || 80)}
              {expandedSections.experience ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {expandedSections.experience && (
            <div className="p-5 pt-0 border-t border-slate-800/60 space-y-4">
              <div className="space-y-3 pt-3">
                {sections.experience?.items?.map((exp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-white">
                      <span>{exp.title}</span>
                      <span className="text-slate-400">{exp.duration}</span>
                    </div>
                    <div className="text-indigo-400 font-medium">{exp.company}</div>
                    
                    {exp.responsibilities && (
                      <ul className="space-y-1 text-slate-300 list-disc list-inside">
                        {exp.responsibilities.map((r, i) => (
                          <li key={i}>{r}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Auditor Notes:</span>
                <ul className="space-y-1">
                  {sections.experience?.findings?.map((f, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-emerald-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 7. CERTIFICATIONS */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden">
          <div
            onClick={() => toggleSection('certifications')}
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">7. Certifications & Credentials</h3>
                <p className="text-xs text-slate-400">Relevance, validity, and professional presentation</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {getStatusBadge(sections.certifications?.status, sections.certifications?.score || 80)}
              {expandedSections.certifications ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </div>
          </div>

          {expandedSections.certifications && (
            <div className="p-5 pt-0 border-t border-slate-800/60 space-y-4">
              <div className="pt-3">
                {sections.certifications?.items?.length ? (
                  <div className="space-y-1.5">
                    {sections.certifications.items.map((cert, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-400 shrink-0" />
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400">No industry certifications currently listed on resume.</p>
                )}
              </div>

              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300">Auditor Notes:</span>
                <ul className="space-y-1">
                  {sections.certifications?.findings?.map((f, idx) => (
                    <li key={idx} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-amber-400">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
