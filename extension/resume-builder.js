// Advanced resume builder with Word document generation
class ResumeBuilder {
    constructor() {
        this.templates = {
            professional: {
                name: 'Professional',
                description: 'Clean, modern design suitable for most industries',
                colors: {
                    primary: '#2563EB',
                    secondary: '#64748B',
                    accent: '#0F172A'
                }
            },
            creative: {
                name: 'Creative',
                description: 'Eye-catching design for creative professionals',
                colors: {
                    primary: '#7C3AED',
                    secondary: '#EC4899',
                    accent: '#1F2937'
                }
            },
            minimalist: {
                name: 'Minimalist',
                description: 'Simple, clean layout focusing on content',
                colors: {
                    primary: '#059669',
                    secondary: '#6B7280',
                    accent: '#111827'
                }
            },
            executive: {
                name: 'Executive',
                description: 'Sophisticated design for senior positions',
                colors: {
                    primary: '#DC2626',
                    secondary: '#4B5563',
                    accent: '#0F172A'
                }
            }
        };
    }

    // Generate optimized resume content
    generateOptimizedResume(userProfile, jobDescription, extractedKeywords) {
        const optimizedContent = {
            personalInfo: this.optimizePersonalInfo(userProfile),
            summary: this.generateOptimizedSummary(userProfile, extractedKeywords),
            skills: this.optimizeSkills(userProfile, extractedKeywords),
            experience: this.optimizeExperience(userProfile, extractedKeywords),
            education: this.optimizeEducation(userProfile),
            certifications: this.optimizeCertifications(userProfile),
            projects: this.optimizeProjects(userProfile, extractedKeywords)
        };

        return optimizedContent;
    }

    optimizePersonalInfo(userProfile) {
        return {
            fullName: `${userProfile['first-name'] || ''} ${userProfile['last-name'] || ''}`.trim(),
            email: userProfile.email || '',
            phone: userProfile.phone || '',
            location: userProfile.location || '',
            linkedin: userProfile.linkedin || '',
            github: userProfile.github || '',
            portfolio: userProfile.portfolio || ''
        };
    }

    generateOptimizedSummary(userProfile, extractedKeywords) {
        const topKeywords = extractedKeywords
            .filter(k => k.type === 'technical' || k.type === 'skill')
            .slice(0, 8)
            .map(k => k.text);

        const baseSummary = userProfile.summary || '';
        
        // Create an ATS-optimized summary
        const optimizedSummary = `Results-driven professional with expertise in ${topKeywords.slice(0, 3).join(', ')}. 
        Proven track record of delivering high-quality solutions using ${topKeywords.slice(3, 6).join(', ')}. 
        ${baseSummary} Skilled in ${topKeywords.slice(-2).join(' and ')}, with a focus on driving business value through technology.`;

        return optimizedSummary.replace(/\s+/g, ' ').trim();
    }

    optimizeSkills(userProfile, extractedKeywords) {
        const userSkills = (userProfile.skills || '').split(',').map(s => s.trim()).filter(s => s);
        const jdSkills = extractedKeywords
            .filter(k => k.type === 'technical' || k.type === 'skill')
            .map(k => k.text);

        // Combine and prioritize skills
        const allSkills = [...new Set([...jdSkills, ...userSkills])];
        
        // Categorize skills
        const skillCategories = {
            'Programming Languages': [],
            'Frameworks & Libraries': [],
            'Databases': [],
            'Cloud & DevOps': [],
            'Tools & Technologies': [],
            'Soft Skills': []
        };

        // Categorization logic
        allSkills.forEach(skill => {
            const skillLower = skill.toLowerCase();
            
            if (['javascript', 'python', 'java', 'c++', 'c#', 'typescript', 'go', 'rust', 'php', 'ruby'].some(lang => skillLower.includes(lang))) {
                skillCategories['Programming Languages'].push(skill);
            } else if (['react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring'].some(fw => skillLower.includes(fw))) {
                skillCategories['Frameworks & Libraries'].push(skill);
            } else if (['sql', 'mongodb', 'postgresql', 'mysql', 'redis', 'elasticsearch'].some(db => skillLower.includes(db))) {
                skillCategories['Databases'].push(skill);
            } else if (['aws', 'azure', 'gcp', 'docker', 'kubernetes', 'jenkins', 'terraform'].some(cloud => skillLower.includes(cloud))) {
                skillCategories['Cloud & DevOps'].push(skill);
            } else if (['leadership', 'communication', 'teamwork', 'problem solving', 'project management'].some(soft => skillLower.includes(soft))) {
                skillCategories['Soft Skills'].push(skill);
            } else {
                skillCategories['Tools & Technologies'].push(skill);
            }
        });

        // Remove empty categories
        Object.keys(skillCategories).forEach(key => {
            if (skillCategories[key].length === 0) {
                delete skillCategories[key];
            }
        });

        return skillCategories;
    }

    optimizeExperience(userProfile, extractedKeywords) {
        // This would parse and optimize work experience
        // For demo purposes, return a template
        const experiences = userProfile.experience || [];
        
        // If no experience provided, create a template based on keywords
        if (experiences.length === 0) {
            const topSkills = extractedKeywords.slice(0, 5).map(k => k.text);
            return [{
                title: 'Software Developer',
                company: 'Previous Employer',
                duration: '2020 - Present',
                achievements: [
                    `Developed applications using ${topSkills.slice(0, 2).join(' and ')}`,
                    `Implemented solutions with ${topSkills.slice(2, 4).join(' and ')}`,
                    `Collaborated with cross-functional teams to deliver projects on time`,
                    `Improved system performance and user experience`
                ]
            }];
        }

        return experiences;
    }

    optimizeEducation(userProfile) {
        return userProfile.education || [{
            degree: 'Bachelor of Science',
            field: 'Computer Science',
            school: 'University Name',
            year: '2020',
            gpa: ''
        }];
    }

    optimizeCertifications(userProfile) {
        return userProfile.certifications || [];
    }

    optimizeProjects(userProfile, extractedKeywords) {
        const projects = userProfile.projects || [];
        
        // If no projects, suggest some based on keywords
        if (projects.length === 0) {
            const topSkills = extractedKeywords.slice(0, 6).map(k => k.text);
            return [{
                name: 'Portfolio Website',
                description: `Personal portfolio website built with ${topSkills.slice(0, 2).join(' and ')}`,
                technologies: topSkills.slice(0, 3),
                link: ''
            }, {
                name: 'Full-Stack Application',
                description: `Web application demonstrating proficiency in ${topSkills.slice(2, 4).join(' and ')}`,
                technologies: topSkills.slice(2, 5),
                link: ''
            }];
        }

        return projects;
    }

    // Calculate detailed ATS score
    calculateDetailedATSScore(userProfile, extractedKeywords) {
        const userSkills = (userProfile.skills || '').toLowerCase().split(',').map(s => s.trim());
        const userSummary = (userProfile.summary || '').toLowerCase();
        const jdKeywords = extractedKeywords.map(k => k.text.toLowerCase());

        let score = 0;
        let maxScore = 0;
        const matches = [];
        const misses = [];

        extractedKeywords.forEach(keyword => {
            const keywordLower = keyword.text.toLowerCase();
            maxScore += keyword.importance;

            // Check if keyword appears in user's skills or summary
            const inSkills = userSkills.some(skill => 
                skill.includes(keywordLower) || keywordLower.includes(skill)
            );
            const inSummary = userSummary.includes(keywordLower);

            if (inSkills || inSummary) {
                score += keyword.importance;
                matches.push(keyword);
            } else {
                misses.push(keyword);
            }
        });

        const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

        return {
            percentage,
            matches,
            misses,
            recommendations: this.generateRecommendations(misses.slice(0, 5))
        };
    }

    generateRecommendations(missingKeywords) {
        if (missingKeywords.length === 0) {
            return ['Your profile matches well with the job requirements!'];
        }

        return [
            `Consider adding these skills to your profile: ${missingKeywords.slice(0, 3).map(k => k.text).join(', ')}`,
            'Update your summary to include more relevant keywords',
            'Highlight specific achievements that demonstrate these skills',
            'Consider taking courses or certifications in missing areas'
        ];
    }

    // Generate Word document
    async generateWordDocument(resumeContent, template = 'professional') {
        try {
            // This would use the docx library to create a Word document
            // For now, return a placeholder
            const docContent = this.generateDocumentContent(resumeContent, template);
            return this.createWordFile(docContent, resumeContent.personalInfo.fullName);
        } catch (error) {
            console.error('Error generating Word document:', error);
            throw error;
        }
    }

    generateDocumentContent(resumeContent, template) {
        const { personalInfo, summary, skills, experience, education } = resumeContent;
        
        return `
${personalInfo.fullName.toUpperCase()}
${personalInfo.email} | ${personalInfo.phone}
${personalInfo.linkedin ? `LinkedIn: ${personalInfo.linkedin}` : ''}
${personalInfo.github ? `GitHub: ${personalInfo.github}` : ''}

PROFESSIONAL SUMMARY
${summary}

TECHNICAL SKILLS
${Object.entries(skills).map(([category, skillList]) => 
    `${category}: ${skillList.join(', ')}`
).join('\n')}

PROFESSIONAL EXPERIENCE
${experience.map(exp => `
${exp.title} - ${exp.company}
${exp.duration}
${exp.achievements.map(achievement => `• ${achievement}`).join('\n')}
`).join('\n')}

EDUCATION
${education.map(edu => `
${edu.degree} in ${edu.field}
${edu.school}, ${edu.year}
${edu.gpa ? `GPA: ${edu.gpa}` : ''}
`).join('\n')}
        `;
    }

    createWordFile(content, fileName) {
        // Create a simple text file for now
        // In a real implementation, you'd use the docx library
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName.replace(/\s+/g, '_')}_ATS_Resume.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return { success: true, fileName: a.download };
    }

    // Export resume in different formats
    exportResume(resumeContent, format = 'docx') {
        switch (format) {
            case 'docx':
                return this.generateWordDocument(resumeContent);
            case 'pdf':
                return this.generatePDFDocument(resumeContent);
            case 'txt':
                return this.generateTextDocument(resumeContent);
            default:
                throw new Error('Unsupported format');
        }
    }

    generateTextDocument(resumeContent) {
        const content = this.generateDocumentContent(resumeContent);
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${resumeContent.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        return { success: true, fileName: a.download };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResumeBuilder;
} else {
    window.ResumeBuilder = ResumeBuilder;
}