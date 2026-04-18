export interface ResumeContact {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  portfolio?: string;
}

export interface ResumeExperience {
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrentRole: boolean;
  description: string[];
}

export interface ResumeEducation {
  degree: string;
  institution: string;
  graduationDate: string;
  gpa?: string;
  details?: string;
}

export interface ResumeSkill {
  category: string;
  skills: string[];
}

export interface ResumeProject {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Resume {
  contact: ResumeContact;
  professional_summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  projects?: ResumeProject[];
  certifications?: string[];
}

export interface JobDescription {
  title: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
}
