import React, { useState } from 'react';
import { ResumeForm } from './components/ResumeForm';
import { Resume, JobDescription } from './types/resume';
import { ResumeGeneratorService } from './services/resumeGenerator';
import { WordDocumentGenerator } from './services/wordDocumentGenerator';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  portfolio: string;
  professionalSummary: string;
  jobDescription: JobDescription;
  experience: Array<any>;
  education: Array<any>;
  skills: Array<any>;
  certifications: string[];
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleGenerateResume = async (formData: FormData) => {
    setIsLoading(true);
    setSuccessMessage('');

    try {
      // Create base resume object
      const baseResume: Resume = {
        contact: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          linkedIn: formData.linkedIn,
          portfolio: formData.portfolio,
        },
        professional_summary: formData.professionalSummary,
        experience: formData.experience,
        education: formData.education,
        skills: formData.skills,
        certifications: formData.certifications,
      };

      // Generate optimized resume based on job description
      const optimizedResume = ResumeGeneratorService.generateOptimizedResume(
        baseResume,
        formData.jobDescription
      );

      // Generate professional summary if job description is provided
      if (formData.jobDescription.description) {
        const allSkills = optimizedResume.skills
          .flatMap(group => group.skills)
          .slice(0, 5);
        optimizedResume.professional_summary =
          ResumeGeneratorService.generateProfessionalSummary(
            formData.jobDescription,
            allSkills
          );
      }

      // Generate and download Word document
      const filename = `${formData.fullName.replace(/\s+/g, '_')}_Resume.docx`;
      await WordDocumentGenerator.generateAndDownloadResume(optimizedResume, filename);

      setSuccessMessage(`Resume generated and downloaded successfully as "${filename}"`);

      // Reset success message after 5 seconds
      setTimeout(() => setSuccessMessage(''), 5000);
    } catch (error) {
      console.error('Error generating resume:', error);
      alert('Error generating resume. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">ATS Resume Creator</h1>
          <p className="text-lg text-gray-700">
            Generate an optimized resume tailored to your target job description
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <ResumeForm onGenerateResume={handleGenerateResume} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default App;
