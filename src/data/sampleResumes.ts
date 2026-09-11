import { ResumeAnalysisResult } from '../types';

export interface SampleResumePreset {
  id: string;
  name: string;
  targetRole: string;
  tagline: string;
  fileName: string;
  fileSize: number;
  extractedText: string;
  analysis: ResumeAnalysisResult;
}

export const SAMPLE_RESUMES: SampleResumePreset[] = [
  {
    id: 'demo-cs-fresher',
    name: 'College CS Fresher (Software Developer)',
    targetRole: 'Software Developer',
    tagline: 'Final year B.Tech Computer Science graduate aiming for Software Development roles.',
    fileName: 'Alex_Chen_Software_Resume.pdf',
    fileSize: 1024 * 340, // 340 KB
    extractedText: `ALEX CHEN
San Jose, CA | alex.chen@email.com | (555) 234-5678 | linkedin.com/in/alexchen-dev | github.com/alexchen24

OBJECTIVE
Motivated Computer Science graduate from State University seeking an entry-level Software Developer position to utilize programming skills in Java, Python, and web technologies to build scalable software products.

EDUCATION
B.S. in Computer Science | State University, San Jose, CA
Graduation: May 2024 | GPA: 3.7/4.0
Relevant Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Computer Networks, Software Engineering.

TECHNICAL SKILLS
Languages: Java, Python, C++, JavaScript, TypeScript, SQL, HTML5, CSS3
Frameworks & Libraries: React, Node.js, Express, Spring Boot (Basics), Tailwind CSS
Databases: PostgreSQL, MongoDB, MySQL
Tools & Platforms: Git, GitHub, Docker, Postman, Linux, VS Code

PROJECTS
Campus Event Hub — Full Stack Web Application (React, Node.js, PostgreSQL)
- Developed a responsive web portal allowing 1,500+ university students to discover and register for campus events in real-time.
- Engineered RESTful API endpoints handling event creation, ticket reservations, and user authentication using JWT and bcrypt.
- Implemented database indexing and query optimization, reducing event search latency by 35%.

Automated Code Grading Assistant (Python, Flask, Docker)
- Built a sandboxed testing utility for computer science professors to evaluate student programming assignments automatically.
- Integrated Docker containers to safely execute untrusted Python code in isolated environments with strict CPU and timeout limits.
- Processed 500+ student submissions with automated test reports and test coverage metrics.

WORK EXPERIENCE
Computer Science Department, State University — Undergraduate Teaching Assistant
August 2023 – April 2024
- Assisted lead professor in conducting lab sessions for 60+ students in CS 101: Introduction to Data Structures.
- Conducted weekly office hours to debug C++ and Java assignments, aiding student concept retention.
- Graded bi-weekly homework assignments with detailed feedback on coding style and algorithmic complexity.

CERTIFICATIONS
- Meta Front-End Developer Professional Certificate (Coursera)
- Oracle Certified Associate, Java SE 8 Programmer`,
    analysis: {
      id: 'demo-cs-fresher',
      fileName: 'Alex_Chen_Software_Resume.pdf',
      fileSize: 1024 * 340,
      targetJobRole: 'Software Developer',
      jobDescription: 'Looking for a passionate entry-level Software Developer with solid foundations in Data Structures, Java, REST APIs, Git, and automated testing.',
      analyzedAt: new Date().toISOString(),
      isDemo: true,
      overallScore: 84,
      atsScore: 88,
      contentScore: 83,
      skillsScore: 86,
      experienceScore: 78,
      educationScore: 92,
      formattingScore: 85,
      keywordScore: 80,
      jobMatchScore: 82,
      strengths: [
        'Clear, clean contact section with both LinkedIn and GitHub profiles.',
        'High-impact projects with quantifiable results (e.g. 1,500+ students, 35% latency reduction).',
        'Strong technical foundation in Core CS (Data Structures, OOP, Database Systems).',
        'Demonstrated teamwork through university Teaching Assistant role.'
      ],
      weaknesses: [
        'Career objective is somewhat generic and uses traditional first-person sentiment instead of a punchy summary.',
        'Lacks mention of automated CI/CD pipelines or cloud platforms like AWS/GCP.',
        'Work experience lacks measurable metrics on how grading or tutoring improved passing rates.'
      ],
      skillsFound: [
        'Java',
        'Python',
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'PostgreSQL',
        'Git',
        'Docker',
        'REST APIs',
        'Data Structures'
      ],
      recommendedSkills: [
        'AWS / Cloud Basics',
        'CI/CD (GitHub Actions)',
        'Unit Testing (JUnit / Jest)',
        'Redis / Caching',
        'Microservices architecture'
      ],
      matchingKeywords: [
        'Java',
        'Data Structures',
        'REST APIs',
        'Git',
        'SQL',
        'Algorithms',
        'Software Engineering'
      ],
      missingKeywords: [
        'Unit Testing',
        'Automated Testing',
        'CI/CD',
        'Agile / Scrum',
        'System Design'
      ],
      atsDetails: {
        isAtsFriendly: true,
        scoreExplanation: 'Your resume follows a single-column, clean layout that modern ATS engines parse with high fidelity. Section headings are standard and clear.',
        formattingIssues: [],
        tableColumnIssues: ['Safe: No multi-column or floating table blocks detected.'],
        headingIssues: ['Headings are standard: OBJECTIVE, EDUCATION, TECHNICAL SKILLS, PROJECTS, WORK EXPERIENCE.'],
        contactIssues: ['Complete contact card found: Email, Phone, LinkedIn, GitHub and Location.'],
        keywordUsage: 'Good density of fundamental computer science and development terms.'
      },
      sectionAnalysis: {
        contactInfo: {
          score: 95,
          status: 'good',
          findings: [
            'All primary contact fields present including verified GitHub and LinkedIn URLs.',
            'Location provided at city/state level (ATS-preferred standard).'
          ],
          details: {
            name: 'Alex Chen',
            email: 'alex.chen@email.com',
            phone: '(555) 234-5678',
            linkedin: 'linkedin.com/in/alexchen-dev',
            github: 'github.com/alexchen24',
            location: 'San Jose, CA'
          }
        },
        careerObjective: {
          score: 75,
          status: 'needs_improvement',
          findings: [
            'Objective is clear but passive.',
            'Recommendation: Switch from "Seeking a position to utilize skills" to a value-driven Professional Summary highlighting your full-stack and systems achievements.'
          ],
          summaryText: 'Motivated Computer Science graduate from State University seeking an entry-level Software Developer position to utilize programming skills in Java, Python, and web technologies.'
        },
        education: {
          score: 92,
          status: 'good',
          findings: [
            'Degree, university name, graduation date, and high GPA (3.7) cleanly presented.',
            'Relevant coursework supports junior developer applications.'
          ],
          entries: [
            {
              degree: 'B.S. in Computer Science',
              institution: 'State University, San Jose, CA',
              year: 'May 2024',
              scoreOrGpa: 'GPA: 3.7/4.0',
              coursework: ['Data Structures & Algorithms', 'OOP', 'Database Systems', 'Computer Networks', 'Software Engineering']
            }
          ]
        },
        skills: {
          score: 86,
          status: 'good',
          findings: [
            'Well categorized by Languages, Frameworks, Databases, and Tools.',
            'Could benefit from prioritizing modern industry standards like Cloud and CI/CD.'
          ],
          technicalSkills: ['Java', 'Python', 'C++', 'JavaScript', 'TypeScript', 'SQL', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'Git'],
          softSkills: ['Mentoring / Teaching', 'Collaboration', 'Problem Solving']
        },
        projects: {
          score: 90,
          status: 'good',
          findings: [
            'Outstanding project descriptions featuring quantified metrics and real stack details.',
            'Security and performance optimizations (indexing, bcrypt, sandboxing) highlight deep understanding.'
          ],
          items: [
            {
              title: 'Campus Event Hub — Full Stack Web Application',
              technologies: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
              problemSolved: 'Streamlined university event reservations and ticket ticketing.',
              role: 'Full Stack Developer',
              impact: 'Served 1,500+ students and reduced query latency by 35%.',
              metricsPresent: true
            },
            {
              title: 'Automated Code Grading Assistant',
              technologies: ['Python', 'Flask', 'Docker'],
              problemSolved: 'Automated student assignment evaluation in an isolated sandbox.',
              role: 'Backend Developer',
              impact: 'Safely executed 500+ student code submissions with detailed performance reports.',
              metricsPresent: true
            }
          ]
        },
        experience: {
          score: 78,
          status: 'needs_improvement',
          findings: [
            'Teaching Assistant demonstrates leadership and core coding knowledge.',
            'Add measurable student outcome metrics (e.g., helped 90%+ of students pass lab assignments).'
          ],
          items: [
            {
              title: 'Undergraduate Teaching Assistant',
              company: 'State University Computer Science Department',
              duration: 'August 2023 – April 2024',
              responsibilities: [
                'Conducted weekly lab sessions for 60+ students in introductory data structures.',
                'Provided code review and debugging support in C++ and Java.'
              ],
              quantifiableResults: ['Supported 60+ undergraduate students weekly across lab modules.']
            }
          ]
        },
        certifications: {
          score: 88,
          status: 'good',
          findings: ['Recognized industry credentials from Meta and Oracle reinforce self-learning and Java proficiency.'],
          items: [
            'Meta Front-End Developer Professional Certificate (Coursera)',
            'Oracle Certified Associate, Java SE 8 Programmer'
          ]
        }
      },
      recommendations: [
        {
          category: 'Career Objective / Summary',
          before: 'Motivated Computer Science graduate seeking an entry-level Software Developer position to utilize programming skills in Java, Python, and web technologies.',
          suggestion: 'Results-driven Computer Science graduate with hands-on experience developing scalable full-stack applications with Java, React, and PostgreSQL. Built platforms serving 1,500+ active university users with an emphasis on low latency and clean API design.',
          reason: 'Transforms passive student language into active, metric-backed professional competence that catches recruiter attention in 6 seconds.'
        },
        {
          category: 'Experience Bullets',
          before: 'Graded bi-weekly homework assignments with detailed feedback on coding style and algorithmic complexity.',
          suggestion: 'Evaluated 120+ bi-weekly code submissions across algorithmic correctness and time complexity, boosting average student lab scores by 14% over the semester.',
          reason: 'Adds quantifiable scale and shows concrete educational impact.'
        },
        {
          category: 'Skills / Tools Section',
          before: 'Spring Boot (Basics)',
          suggestion: 'Spring Boot (REST APIs, Data JPA, Security)',
          reason: 'Avoid placing "(Basics)" or beginner disclaimers on your resume. Instead, specify the sub-modules you have practiced.'
        }
      ],
      improvedSummary: 'Results-driven Computer Science graduate with hands-on experience building scalable full-stack web applications with Java, Python, React, and PostgreSQL. Proven ability to optimize backend database queries by 35% and construct sandboxed Docker execution environments. Seeking to contribute high-velocity feature development and rigorous code quality to a collaborative engineering team.'
    }
  },
  {
    id: 'demo-data-analyst',
    name: 'Data Analyst / BI Specialist',
    targetRole: 'Data Analyst',
    tagline: 'Entry-to-mid career profile with SQL, Tableau, Python, and statistical modeling expertise.',
    fileName: 'Priya_Sharma_Data_Analyst.docx',
    fileSize: 1024 * 210,
    extractedText: `PRIYA SHARMA
Austin, TX | (512) 987-6543 | priya.sharma@email.com | linkedin.com/in/priyasharma-data

SUMMARY
Analytical and detail-oriented Data Analyst with 1.5 years of experience translating complex datasets into actionable business intelligence dashboards. Proficient in SQL, Python, Tableau, and Excel statistical modeling.

TECHNICAL SKILLS
Data Analysis & BI: SQL, Tableau, Power BI, Advanced Excel (VLOOKUP, Pivot Tables, Power Query)
Programming: Python (Pandas, NumPy, Matplotlib, Seaborn), R basics
Databases: Snowflake, PostgreSQL, BigQuery
Methodologies: A/B Testing, Cohort Analysis, ETL Pipeline monitoring, Regression Analysis

EXPERIENCE
Junior Data Analyst | Retail Pulse Analytics, Austin, TX
July 2023 – Present
- Queried large-scale PostgreSQL and Snowflake data warehouses (5M+ transaction records) to extract weekly customer retention cohorts.
- Designed 8 interactive Tableau dashboards adopted by regional sales leaders to track $4.2M in recurring sales pipelines.
- Automated daily inventory tracking reports using Python and Cron, saving the merchandising team 6 hours of manual spreadsheet entry per week.

Data Intern | Horizon Logistics
January 2023 – June 2023
- Cleaned and normalized messy shipment delivery logs across 14 freight hubs using Python Pandas.
- Identified recurring dispatch bottlenecks, contributing to a 12% reduction in regional transit delay penalties.

EDUCATION
B.S. in Information Systems & Business Analytics
University of Texas, Austin | May 2023 | GPA: 3.8/4.0

PROJECTS
E-Commerce Churn Prediction Model (Python, Scikit-Learn, Streamlit)
- Trained a Logistic Regression and Random Forest classifier on 25,000 customer profiles to predict churn likelihood with 83% accuracy.
- Built an interactive Streamlit UI allowing marketing managers to simulate promotional discount impact.`,
    analysis: {
      id: 'demo-data-analyst',
      fileName: 'Priya_Sharma_Data_Analyst.docx',
      fileSize: 1024 * 210,
      targetJobRole: 'Data Analyst',
      jobDescription: 'Seeking a Data Analyst to build executive dashboards in Tableau, write complex SQL queries, and perform exploratory data analysis using Python.',
      analyzedAt: new Date().toISOString(),
      isDemo: true,
      overallScore: 89,
      atsScore: 91,
      contentScore: 88,
      skillsScore: 92,
      experienceScore: 87,
      educationScore: 90,
      formattingScore: 89,
      keywordScore: 90,
      jobMatchScore: 93,
      strengths: [
        'Impressive quantifiable outcomes throughout experience ($4.2M pipeline, 6 hours saved, 5M+ records).',
        'Strong alignment with Data Analyst tooling: Snowflake, PostgreSQL, Tableau, and Python Pandas.',
        'High GPA and relevant degree in Information Systems & Analytics.'
      ],
      weaknesses: [
        'Could include a GitHub or portfolio link to showcase data visualization projects or notebooks.',
        'Missing keywords around data governance, cloud data warehouses, or dbt.'
      ],
      skillsFound: ['SQL', 'Python', 'Tableau', 'Power BI', 'Excel', 'Pandas', 'PostgreSQL', 'Snowflake', 'BigQuery', 'A/B Testing'],
      recommendedSkills: ['dbt', 'Airflow', 'Statistical Hypothesis Testing', 'Machine Learning pipelines'],
      matchingKeywords: ['SQL', 'Tableau', 'Python', 'Dashboards', 'PostgreSQL', 'Exploratory Data Analysis'],
      missingKeywords: ['Data Modeling', 'Data Governance', 'dbt', 'KPI Definition'],
      atsDetails: {
        isAtsFriendly: true,
        scoreExplanation: 'DOCX text extracted cleanly. Headings are concise, and standard bullet points are parsed cleanly by enterprise ATS tools.',
        formattingIssues: [],
        tableColumnIssues: ['Clean single column formatting.'],
        headingIssues: ['Standard professional headings.'],
        contactIssues: ['Add GitHub or Tableau Public link to verify your visualization work.'],
        keywordUsage: 'Excellent density of business analytics and data warehousing terms.'
      },
      sectionAnalysis: {
        contactInfo: {
          score: 88,
          status: 'good',
          findings: ['Contact information is complete, but adding a portfolio link (Tableau Public / GitHub) is recommended for analysts.'],
          details: {
            name: 'Priya Sharma',
            email: 'priya.sharma@email.com',
            phone: '(512) 987-6543',
            linkedin: 'linkedin.com/in/priyasharma-data',
            location: 'Austin, TX'
          }
        },
        careerObjective: {
          score: 90,
          status: 'good',
          findings: ['Professional, concise, and explicitly communicates experience and key analytics stack.'],
          summaryText: 'Analytical and detail-oriented Data Analyst with 1.5 years of experience translating complex datasets into actionable business intelligence dashboards.'
        },
        education: {
          score: 90,
          status: 'good',
          findings: ['Relevant degree, honors GPA, and accredited university.'],
          entries: [
            {
              degree: 'B.S. in Information Systems & Business Analytics',
              institution: 'University of Texas, Austin',
              year: 'May 2023',
              scoreOrGpa: 'GPA: 3.8/4.0'
            }
          ]
        },
        skills: {
          score: 92,
          status: 'good',
          findings: ['Covers full analytics lifecycle: querying, visualization, pipeline automation, and statistical testing.'],
          technicalSkills: ['SQL', 'Tableau', 'Power BI', 'Python', 'Snowflake', 'BigQuery', 'Excel'],
          softSkills: ['Stakeholder Communication', 'Business Requirements Gathering']
        },
        projects: {
          score: 86,
          status: 'good',
          findings: ['Churn prediction model showcases ability to go beyond basic BI into predictive modeling.'],
          items: [
            {
              title: 'E-Commerce Churn Prediction Model',
              technologies: ['Python', 'Scikit-Learn', 'Streamlit'],
              impact: '83% accuracy in predicting customer attrition across 25,000 records.',
              metricsPresent: true
            }
          ]
        },
        experience: {
          score: 87,
          status: 'good',
          findings: ['Strong action verbs (Queried, Designed, Automated, Cleaned) with tangible dollar and time metrics.'],
          items: [
            {
              title: 'Junior Data Analyst',
              company: 'Retail Pulse Analytics',
              duration: 'July 2023 – Present',
              responsibilities: [
                'Queried large-scale PostgreSQL and Snowflake data warehouses to extract retention cohorts.',
                'Designed 8 interactive Tableau dashboards for executive sales tracking.'
              ],
              quantifiableResults: ['$4.2M in tracked pipeline', 'Saved 6 hours/week of manual reporting']
            }
          ]
        },
        certifications: {
          score: 80,
          status: 'needs_improvement',
          findings: ['No formal certifications listed. Consider Tableau Certified Data Analyst or AWS Certified Data Analytics.'],
          items: []
        }
      },
      recommendations: [
        {
          category: 'Portfolio Verification',
          before: 'Austin, TX | (512) 987-6543 | priya.sharma@email.com | linkedin.com/in/priyasharma-data',
          suggestion: 'Austin, TX | (512) 987-6543 | priya.sharma@email.com | linkedin.com/in/priyasharma-data | public.tableau.com/app/profile/priyasharma',
          reason: 'Tableau Public portfolios allow hiring managers to interact with your live dashboards before scheduling an interview.'
        },
        {
          category: 'Work Experience Bullet',
          before: 'Cleaned and normalized messy shipment delivery logs across 14 freight hubs using Python Pandas.',
          suggestion: 'Standardized and validated 250,000+ logistics event logs across 14 regional hubs using Python Pandas scripts, eliminating 95% of data parsing errors.',
          reason: 'Quantifies data scale and states the concrete error-reduction outcome.'
        }
      ],
      improvedSummary: 'Data Analyst with 1.5+ years of experience delivering high-impact business intelligence dashboards and scalable SQL data pipelines across PostgreSQL and Snowflake. Specialized in customer retention modeling, workflow automation, and executive Tableau visualization that track multi-million dollar revenue funnels.'
    }
  }
];
