# ATS Resume Creator

A powerful web application that generates ATS-optimized resumes tailored to specific job descriptions. Simply provide your resume information and a job description, and the app will create a Word document (.docx) optimized for the specific role.

## Features

✅ **Smart Resume Tailoring** - Automatically reorganizes and emphasizes resume sections based on job description
✅ **Keyword Extraction** - Identifies relevant skills and keywords from job postings
✅ **Professional Formatting** - Generates beautifully formatted Word documents
✅ **ATS-Optimized** - Clean structure optimized for Applicant Tracking Systems
✅ **Easy to Use** - Intuitive form interface with pre-filled sample data
✅ **Offline First** - Works completely in the browser, no server required

## How It Works

### 1. **Input Your Resume Information**
   - Fill in personal details, contact information
   - Add your professional experiences with descriptions
   - Include education and certifications
   - List your technical skills organized by category

### 2. **Provide Job Description & Required Skills**
   - Paste the complete job description
   - List required skills (comma-separated)
   - List nice-to-have skills (comma-separated)

### 3. **Generate Optimized Resume**
   - Click "Generate & Download Resume"
   - The app analyzes the job description
   - Reorganizes your experience by relevance
   - Highlights matching skills
   - Generates a professional Word document

### 4. **Download & Use**
   - Resume is automatically downloaded as `.docx` file
   - Ready to submit to job applications
   - Can be further edited in Microsoft Word if needed

## Resume Optimization Features

### Intelligent Reordering
- Experiences are automatically reordered by relevance to the job description
- Most relevant positions appear first

### Skill Highlighting
- Skills matching the job description are prioritized
- Organized by category with relevant skills listed first

### Professional Summary Generation
- Auto-generates professional summary tailored to the target role
- Incorporates top matching skills from your profile

### Keyword Extraction
- Automatically extracts technical keywords from job descriptions
- Matches with your existing experience and skills
- Ensures maximum ATS compatibility

## Technology Stack

- **Frontend Framework**: React 18.3 + TypeScript
- **Styling**: TailwindCSS
- **Word Generation**: docx library
- **Build Tool**: Vite
- **Icons**: Lucide React

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Usage Example

### Sample Job Description
```
We are looking for a Senior Full Stack Developer with 5+ years of experience.
Required Skills: React, Node.js, PostgreSQL, Docker, AWS
Nice-to-Have: Kubernetes, GraphQL, CI/CD

The ideal candidate will have:
- Strong experience with microservices architecture
- Proven ability to lead technical initiatives
- Experience with cloud platforms (AWS/Azure/GCP)
- Excellent communication and mentoring skills
```

### Input Your Data
1. Fill in contact information (pre-populated with sample data)
2. Add your professional experience with bullet points
3. Include your education details
4. List your technical skills
5. Paste the job description above
6. Enter required and nice-to-have skills

### Get Output
- Click "Generate & Download Resume"
- Receive a professionally formatted Word document
- Document is automatically named: `[Your_Name]_Resume.docx`

## Resume Structure

The generated document includes:

```
┌─────────────────────────────────────┐
│     Full Name & Contact Info        │
├─────────────────────────────────────┤
│     PROFESSIONAL SUMMARY            │
├─────────────────────────────────────┤
│   PROFESSIONAL EXPERIENCE           │
│   (Ordered by job relevance)        │
├─────────────────────────────────────┤
│        EDUCATION                    │
├─────────────────────────────────────┤
│      SKILLS                         │
│   (Relevant skills highlighted)     │
├─────────────────────────────────────┤
│      PROJECTS (Optional)            │
├─────────────────────────────────────┤
│    CERTIFICATIONS (Optional)        │
└─────────────────────────────────────┘
```

## Key Components

### ResumeForm Component (`src/components/ResumeForm.tsx`)
- User interface for entering resume data
- Form validation
- Dynamic experience entry
- Job description input fields

### ResumeGeneratorService (`src/services/resumeGenerator.ts`)
- Keyword extraction from job descriptions
- Experience reordering by relevance
- Skill prioritization
- Professional summary generation

### WordDocumentGenerator (`src/services/wordDocumentGenerator.ts`)
- Converts resume data to Word document format
- Professional styling with:
  - Color-coded headings
  - Proper spacing and formatting
  - Bullet point lists
  - Hyperlinks for portfolio/LinkedIn
- Downloads document to user's computer

## API Reference

### ResumeGeneratorService

#### `extractJobKeywords(jobDescription: JobDescription): string[]`
Extracts all relevant keywords from a job description.

```typescript
const keywords = ResumeGeneratorService.extractJobKeywords({
  title: "Senior Developer",
  description: "We need React and Node.js experts...",
  requiredSkills: ["React", "Node.js"],
  niceToHaveSkills: ["TypeScript", "Docker"]
});
```

#### `generateOptimizedResume(baseResume: Resume, jobDescription: JobDescription): Resume`
Returns a resume tailored to the job description.

```typescript
const optimizedResume = ResumeGeneratorService.generateOptimizedResume(
  myResume,
  jobDescription
);
```

#### `prioritizeSkills(skills: SkillGroup[], jobKeywords: string[])`
Reorders skills based on job relevance.

```typescript
const prioritized = ResumeGeneratorService.prioritizeSkills(
  mySkills,
  extractedKeywords
);
```

### WordDocumentGenerator

#### `generateAndDownloadResume(resume: Resume, filename: string): Promise<void>`
Generates and downloads a resume as a Word document.

```typescript
await WordDocumentGenerator.generateAndDownloadResume(
  resume,
  "My_Resume.docx"
);
```

#### `generateResumeBlob(resume: Resume): Promise<Blob>`
Generates resume as Blob for API uploads or custom handling.

```typescript
const blob = await WordDocumentGenerator.generateResumeBlob(resume);
// Use blob for uploading to server, sending via email, etc.
```

## Data Types

### Resume Interface
```typescript
interface Resume {
  contact: ResumeContact;
  professional_summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: ResumeSkill[];
  projects?: ResumeProject[];
  certifications?: string[];
}
```

### JobDescription Interface
```typescript
interface JobDescription {
  title: string;
  description: string;
  requiredSkills: string[];
  niceToHaveSkills: string[];
}
```

## Tips for Best Results

### 1. **Detailed Experience Descriptions**
Write specific, achievement-focused bullet points:
- ❌ "Worked on backend development"
- ✅ "Optimized database queries, reducing response time by 60%"

### 2. **Comprehensive Skill List**
Include all relevant technical skills:
- Programming languages
- Frameworks and libraries
- Databases and tools
- Cloud platforms
- DevOps technologies

### 3. **Complete Job Description**
Paste the entire job description for better keyword extraction:
- More keywords = better matching
- Technical terms are automatically identified
- Responsibilities provide context for experience

### 4. **Accurate Dates**
Use consistent date formats:
- ✅ "Jan 2020", "January 2020", "2020-01-01"
- ❌ Partial dates or unclear formats

### 5. **Achievement-Oriented Bullets**
Use action verbs and quantifiable results:
- Led, Developed, Implemented, Optimized, Designed
- Include percentages, numbers, and metrics

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern browsers with ES2020+ support

## Limitations

- No server-side processing (all processing happens in-browser)
- Maximum resume size: Limited by browser memory
- Word document editing features: Use Microsoft Word for advanced formatting

## Future Enhancements

- [ ] PDF export option
- [ ] Multiple resume templates
- [ ] Cover letter generation
- [ ] ATS compatibility score
- [ ] Save/load resume drafts
- [ ] LinkedIn profile import
- [ ] Job tracking dashboard
- [ ] Email integration

## Troubleshooting

### Resume not downloading
- Check if popup blocker is enabled
- Ensure JavaScript is enabled
- Try a different browser

### Word document formatting issues
- Open in Microsoft Word 2016+
- Ensure font availability on your system
- Re-save in Word to apply default formatting

### Keywords not matching
- Check spelling of skills
- Use industry-standard terminology
- Paste complete job description (not summary)

## License

MIT - Feel free to use this for personal or commercial projects.

## Support

For issues or feature requests, please create an issue in the repository.

## Sample Resume JSON

A sample resume file (`SAMPLE_RESUME.json`) is provided with typical data structure. Use this as a reference for formatting your resume data.

---

**Happy Resume Building! 🚀**

Remember: A well-tailored resume significantly increases your chances of passing through ATS systems and catching recruiter attention!
