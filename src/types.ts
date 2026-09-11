export interface ContactDetails {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}

export interface SectionFinding {
  type: 'positive' | 'warning' | 'critical';
  text: string;
}

export interface ContactSectionAnalysis {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  findings: string[];
  details: ContactDetails;
}

export interface TextSectionAnalysis {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  findings: string[];
  summaryText?: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  year?: string;
  scoreOrGpa?: string;
  coursework?: string[];
}

export interface EducationSectionAnalysis {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  findings: string[];
  entries: EducationEntry[];
}

export interface SkillsSectionAnalysis {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  findings: string[];
  technicalSkills: string[];
  softSkills: string[];
}

export interface ProjectItem {
  title: string;
  technologies: string[];
  problemSolved?: string;
  role?: string;
  impact?: string;
  metricsPresent: boolean;
}

export interface ProjectsSectionAnalysis {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  findings: string[];
  items: ProjectItem[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  duration?: string;
  responsibilities: string[];
  quantifiableResults: string[];
}

export interface ExperienceSectionAnalysis {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  findings: string[];
  items: ExperienceItem[];
}

export interface CertificationsSectionAnalysis {
  score: number;
  status: 'good' | 'needs_improvement' | 'poor';
  findings: string[];
  items: string[];
}

export interface AllSectionAnalysis {
  contactInfo: ContactSectionAnalysis;
  careerObjective: TextSectionAnalysis;
  education: EducationSectionAnalysis;
  skills: SkillsSectionAnalysis;
  projects: ProjectsSectionAnalysis;
  experience: ExperienceSectionAnalysis;
  certifications: CertificationsSectionAnalysis;
}

export interface AtsDetails {
  isAtsFriendly: boolean;
  scoreExplanation: string;
  formattingIssues: string[];
  tableColumnIssues: string[];
  headingIssues: string[];
  contactIssues: string[];
  keywordUsage: string;
}

export interface RecommendationItem {
  category: string;
  before: string;
  suggestion: string;
  reason: string;
}

export interface ResumeAnalysisResult {
  id: string;
  fileName: string;
  fileSize?: number;
  targetJobRole: string;
  jobDescription?: string;
  analyzedAt: string;
  isDemo?: boolean;

  overallScore: number;
  atsScore: number;
  contentScore: number;
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  formattingScore: number;
  keywordScore: number;
  jobMatchScore: number;

  strengths: string[];
  weaknesses: string[];
  skillsFound: string[];
  recommendedSkills: string[];
  matchingKeywords: string[];
  missingKeywords: string[];

  atsDetails: AtsDetails;
  sectionAnalysis?: Partial<AllSectionAnalysis>;
  recommendations: RecommendationItem[];
  improvedSummary: string;
  extractedText?: string;
}

export interface HistoryItem {
  id: string;
  fileName: string;
  targetJobRole: string;
  overallScore: number;
  atsScore: number;
  jobMatchScore: number;
  analyzedAt: string;
  isDemo?: boolean;
}

export type ActiveTab = 'home' | 'analyzer' | 'dashboard' | 'sections' | 'improve' | 'history' | 'about';
