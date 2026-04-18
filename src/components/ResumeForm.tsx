import React, { useState } from 'react';
import { Plus, Trash2, Download } from 'lucide-react';

interface ResumeFormProps {
  onGenerateResume: (formData: any) => void;
  isLoading?: boolean;
}

export const ResumeForm: React.FC<ResumeFormProps> = ({ onGenerateResume, isLoading = false }) => {
  const [formData, setFormData] = useState({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedIn: 'linkedin.com/in/johndoe',
    portfolio: 'johndoe.com',
    professionalSummary: 'Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications.',
    jobTitle: 'Senior Developer',
    company: 'Tech Corp',
    companyLocation: 'San Francisco, CA',
    startDate: 'Jan 2020',
    endDate: 'Present',
    isCurrentRole: true,
    experience: [
      {
        jobTitle: 'Senior Developer',
        company: 'Tech Corp',
        location: 'San Francisco, CA',
        startDate: 'Jan 2020',
        endDate: 'Present',
        isCurrentRole: true,
        description: [
          'Led development of microservices architecture using Node.js and Docker',
          'Improved API performance by 40% through optimization and caching strategies',
          'Mentored junior developers and conducted code reviews',
        ],
      },
      {
        jobTitle: 'Junior Developer',
        company: 'StartUp Inc',
        location: 'San Francisco, CA',
        startDate: 'Jun 2018',
        endDate: 'Dec 2019',
        isCurrentRole: false,
        description: [
          'Developed React components and implemented responsive UI designs',
          'Collaborated with backend team to implement RESTful APIs',
          'Fixed critical bugs and improved application stability',
        ],
      },
    ],
    education: [
      {
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California',
        graduationDate: '2018',
        gpa: '3.8',
        details: '',
      },
    ],
    skills: [
      {
        category: 'Programming Languages',
        skills: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'],
      },
      {
        category: 'Frontend',
        skills: ['React', 'Vue.js', 'Next.js', 'TailwindCSS', 'Redux'],
      },
      {
        category: 'Backend',
        skills: ['Node.js', 'Django', 'FastAPI', 'PostgreSQL', 'MongoDB'],
      },
      {
        category: 'Tools & Technologies',
        skills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD'],
      },
    ],
    certifications: ['AWS Certified Developer', 'Docker Certified Associate'],
  });

  const [jobDescription, setJobDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [niceToHaveSkills, setNiceToHaveSkills] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index] = { ...updatedExperience[index], [field]: value };
    setFormData(prev => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  const handleDescriptionChange = (expIndex: number, descIndex: number, value: string) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[expIndex].description[descIndex] = value;
    setFormData(prev => ({
      ...prev,
      experience: updatedExperience,
    }));
  };

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          jobTitle: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          isCurrentRole: false,
          description: [''],
        },
      ],
    }));
  };

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateResume({
      ...formData,
      jobDescription: {
        title: 'Job Position',
        description: jobDescription,
        requiredSkills: requiredSkills.split(',').map(s => s.trim()).filter(Boolean),
        niceToHaveSkills: niceToHaveSkills.split(',').map(s => s.trim()).filter(Boolean),
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Contact Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={e => handleInputChange('fullName', e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={e => handleInputChange('email', e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={e => handleInputChange('phone', e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={e => handleInputChange('location', e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="LinkedIn URL"
            value={formData.linkedIn}
            onChange={e => handleInputChange('linkedIn', e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Portfolio URL"
            value={formData.portfolio}
            onChange={e => handleInputChange('portfolio', e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Professional Summary */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Professional Summary</h2>
        <textarea
          placeholder="Enter your professional summary"
          value={formData.professionalSummary}
          onChange={e => handleInputChange('professionalSummary', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Experience */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-900">Professional Experience</h2>
          <button
            type="button"
            onClick={addExperience}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            <Plus size={20} /> Add Experience
          </button>
        </div>

        <div className="space-y-6">
          {formData.experience.map((exp, index) => (
            <div key={index} className="border-l-4 border-blue-500 pl-4 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Job Title"
                  value={exp.jobTitle}
                  onChange={e => handleExperienceChange(index, 'jobTitle', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={e => handleExperienceChange(index, 'company', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={exp.location}
                  onChange={e => handleExperienceChange(index, 'location', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={e => handleExperienceChange(index, 'startDate', e.target.value)}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {!exp.isCurrentRole && (
                  <input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={e => handleExperienceChange(index, 'endDate', e.target.value)}
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.isCurrentRole}
                    onChange={e => handleExperienceChange(index, 'isCurrentRole', e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Currently Working Here</span>
                </label>
              </div>

              {/* Description Bullets */}
              <div className="mt-4 space-y-2">
                {exp.description.map((desc, descIndex) => (
                  <input
                    key={descIndex}
                    type="text"
                    placeholder={`Description ${descIndex + 1}`}
                    value={desc}
                    onChange={e =>
                      handleDescriptionChange(index, descIndex, e.target.value)
                    }
                    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>

              {formData.experience.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="mt-4 flex items-center gap-2 text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} /> Remove
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Job Description & Skills Analysis */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-blue-900">Job Description & Skills</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <textarea
              placeholder="Paste the complete job description here"
              value={jobDescription}
              onChange={e => setJobDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Required Skills (comma-separated)</label>
              <textarea
                placeholder="e.g., React, Node.js, MongoDB"
                value={requiredSkills}
                onChange={e => setRequiredSkills(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nice-to-Have Skills (comma-separated)</label>
              <textarea
                placeholder="e.g., Docker, Kubernetes, GraphQL"
                value={niceToHaveSkills}
                onChange={e => setNiceToHaveSkills(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-bold text-lg"
      >
        <Download size={24} />
        {isLoading ? 'Generating Resume...' : 'Generate & Download Resume'}
      </button>
    </form>
  );
};
