import { Resume, JobDescription, ResumeExperience } from '../types/resume';

/**
 * Resume Generator Service
 * Tailors the resume based on job description and required skills
 */

export class ResumeGeneratorService {
  /**
   * Calculate similarity score between two strings
   */
  private static calculateSimilarity(str1: string, str2: string): number {
    const s1 = str1.toLowerCase();
    const s2 = str2.toLowerCase();

    if (s1 === s2) return 1;

    const words1 = s1.split(/\s+/);
    const words2 = s2.split(/\s+/);

    let matches = 0;
    words1.forEach(word => {
      if (words2.some(w => w.includes(word) || word.includes(w))) {
        matches++;
      }
    });

    return matches / Math.max(words1.length, words2.length);
  }

  /**
   * Extract keywords from job description
   */
  static extractJobKeywords(jobDescription: JobDescription): string[] {
    const keywords = new Set<string>();

    // Add required skills
    jobDescription.requiredSkills.forEach(skill => {
      keywords.add(skill.toLowerCase());
    });

    // Add nice-to-have skills
    jobDescription.niceToHaveSkills.forEach(skill => {
      keywords.add(skill.toLowerCase());
    });

    // Extract technical keywords from description
    const techPatterns = [
      /\b(Java|Python|JavaScript|TypeScript|C\+\+|C#|Go|Rust|PHP|Ruby|Swift|Kotlin)\b/gi,
      /\b(React|Vue|Angular|Next\.js|Django|Flask|Spring|FastAPI|Node\.js|Express)\b/gi,
      /\b(MongoDB|PostgreSQL|MySQL|Redis|Elasticsearch|Firebase|AWS|Azure|GCP)\b/gi,
      /\b(REST|GraphQL|Microservices|Docker|Kubernetes|CI\/CD|Jenkins|GitLab|GitHub|Git)\b/gi,
      /\b(Machine Learning|AI|Data Science|TensorFlow|PyTorch|Pandas|NumPy|Scikit-learn)\b/gi,
    ];

    techPatterns.forEach(pattern => {
      const matches = jobDescription.description.match(pattern);
      if (matches) {
        matches.forEach(match => keywords.add(match.toLowerCase()));
      }
    });

    return Array.from(keywords);
  }

  /**
   * Reorder experiences based on relevance to job description
   */
  static reorderExperiences(
    experiences: ResumeExperience[],
    jobKeywords: string[]
  ): ResumeExperience[] {
    const scored = experiences.map(exp => {
      let score = 0;

      // Score job title relevance
      score += this.calculateSimilarity(exp.jobTitle, jobKeywords.join(' ')) * 5;

      // Score description relevance
      const descriptionText = exp.description.join(' ').toLowerCase();
      jobKeywords.forEach(keyword => {
        if (descriptionText.includes(keyword)) {
          score += 2;
        }
      });

      return { experience: exp, score };
    });

    // Sort by relevance score (higher first), then by most recent
    return scored
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(b.experience.endDate).getTime() - new Date(a.experience.endDate).getTime();
      })
      .map(item => item.experience);
  }

  /**
   * Filter and highlight relevant skills
   */
  static prioritizeSkills(
    skills: Array<{ category: string; skills: string[] }>,
    jobKeywords: string[]
  ) {
    const keywordSet = new Set(jobKeywords.map(k => k.toLowerCase()));

    const prioritized = skills.map(skillGroup => {
      const grouped = {
        ...skillGroup,
        relevantSkills: skillGroup.skills
          .filter(skill => {
            const skillLower = skill.toLowerCase();
            return keywordSet.has(skillLower) ||
              jobKeywords.some(keyword =>
                skillLower.includes(keyword) || keyword.includes(skillLower)
              );
          }),
        otherSkills: skillGroup.skills.filter(skill => {
          const skillLower = skill.toLowerCase();
          return !keywordSet.has(skillLower) &&
            !jobKeywords.some(keyword =>
              skillLower.includes(keyword) || keyword.includes(skillLower)
            );
        }),
      };

      return grouped;
    });

    return prioritized;
  }

  /**
   * Tailor experience descriptions based on job keywords
   */
  static tailorExperienceDescription(
    description: string[],
    jobKeywords: string[]
  ): string[] {
    return description.map(bullet => {
      // Try to enhance bullet point with relevant keywords if they're not already present
      let enhanced = bullet;

      jobKeywords.forEach(keyword => {
        const keywordLower = keyword.toLowerCase();
        if (!bullet.toLowerCase().includes(keywordLower)) {
          // Don't add if not relevant to the bullet
          return;
        }
      });

      return enhanced;
    });
  }

  /**
   * Generate optimized resume for a job description
   */
  static generateOptimizedResume(
    baseResume: Resume,
    jobDescription: JobDescription
  ): Resume {
    const jobKeywords = this.extractJobKeywords(jobDescription);

    return {
      ...baseResume,
      experience: this.reorderExperiences(baseResume.experience, jobKeywords),
      skills: this.prioritizeSkills(baseResume.skills, jobKeywords),
    };
  }

  /**
   * Generate professional summary based on job description
   */
  static generateProfessionalSummary(
    jobDescription: JobDescription,
    skills: string[]
  ): string {
    const relevantSkills = skills.slice(0, 3).join(', ');
    return `Experienced professional with demonstrated expertise in ${relevantSkills}. Proven track record of delivering robust solutions that align with modern ${jobDescription.title} requirements. Seeking to leverage technical skills and experience to contribute to ${jobDescription.title} role.`;
  }
}
