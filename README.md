# ATS Resume Generator Chrome Extension

A powerful Chrome extension that analyzes job descriptions and generates ATS-optimized resumes with intelligent keyword matching and scoring.

## 🚀 Features

### Core Functionality
- **Smart Job Description Extraction**: Automatically detects and extracts job descriptions from popular job sites (Indeed, LinkedIn, Glassdoor, etc.)
- **AI-Powered Keyword Analysis**: Uses advanced NLP techniques to identify critical keywords and requirements
- **ATS Score Calculation**: Provides detailed scoring based on keyword matching and optimization
- **Professional Resume Generation**: Creates Word documents with ATS-optimized formatting
- **Real-time Profile Management**: Save and manage your professional profile across sessions

### Advanced Features
- **Multi-Site Support**: Works across 20+ major job boards and career sites
- **Floating Action Button**: Quick access on job posting pages
- **Keyword Highlighting**: Visual indicators for matched and missing keywords
- **Template Selection**: Multiple professional resume templates
- **Export Options**: Generate resumes in Word, PDF, and text formats
- **Chrome Storage Integration**: Automatic data persistence and backup

## 🛠️ Installation

### From Source
1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension icon will appear in your browser toolbar

### From Chrome Web Store
*Coming soon - pending review*

## 📋 How to Use

### 1. Extract Job Description
- Navigate to any job posting page
- Click the floating action button or extension icon
- The job description will be automatically extracted and analyzed

### 2. Complete Your Profile
- Switch to the "Profile" tab
- Fill in your personal information, skills, and experience
- Your data is automatically saved as you type

### 3. Generate Optimized Resume
- Review your ATS score and keyword matches
- Click "Generate Resume" to create your optimized resume
- Download the Word document with embedded ATS score

## 🎯 ATS Optimization Features

### Keyword Optimization
- **Technical Skills**: Automatically matches programming languages, frameworks, and tools
- **Soft Skills**: Identifies leadership, communication, and interpersonal skills
- **Experience Requirements**: Extracts years of experience and seniority levels
- **Education Requirements**: Detects degree requirements and certifications

### Scoring Algorithm
- **Weighted Keyword Matching**: Important keywords receive higher scores
- **Context Analysis**: Understands keyword relevance within job context
- **Missing Keyword Identification**: Highlights gaps in your profile
- **Optimization Recommendations**: Suggests improvements to increase score

## 🏗️ Technical Architecture

### File Structure
```
extension/
├── manifest.json          # Extension configuration
├── popup.html            # Main UI interface
├── popup.js              # UI logic and interactions
├── background.js         # Service worker for data processing
├── content.js            # Page content extraction
├── resume-builder.js     # Resume generation engine
├── styles.css            # Tailwind CSS styling
└── icons/               # Extension icons
```

### Key Technologies
- **Manifest V3**: Latest Chrome extension architecture
- **Tailwind CSS**: Modern, responsive styling
- **Chrome Storage API**: Data persistence and sync
- **Content Script Injection**: Cross-site job description extraction
- **Advanced NLP**: Keyword extraction and analysis

## 🔧 Development

### Prerequisites
- Node.js 16+ and npm
- Chrome browser
- Basic knowledge of Chrome extension development

### Setup Development Environment
```bash
# Install dependencies
npm install

# Build the extension
npm run build-extension

# Start development server (for testing)
npm run dev
```

### Testing
1. Load the extension in Chrome developer mode
2. Navigate to job posting sites
3. Test extraction and resume generation features
4. Verify data persistence across browser sessions

## 🌟 Supported Job Sites

### Major Job Boards
- Indeed.com
- LinkedIn Jobs
- Glassdoor
- Monster.com
- ZipRecruiter
- Dice.com
- Stack Overflow Jobs
- AngelList/Wellfound

### Company Career Pages
- Works with most standard job posting formats
- Automatic detection of job-related content
- Fallback extraction for custom layouts

## 📊 ATS Score Breakdown

### Score Ranges
- **80-100%**: Excellent match - highly likely to pass ATS screening
- **60-79%**: Good match - solid chance of getting through
- **40-59%**: Fair match - consider adding missing keywords
- **0-39%**: Poor match - significant optimization needed

### Scoring Factors
- Technical skill alignment (40%)
- Experience level match (25%)
- Education requirements (15%)
- Soft skills presence (10%)
- Industry-specific keywords (10%)

## 🔒 Privacy & Security

### Data Handling
- All data is stored locally in Chrome storage
- No personal information is transmitted to external servers
- Job descriptions are processed client-side only
- Optional cloud sync through Chrome account

### Permissions
- `activeTab`: Access current tab for job description extraction
- `storage`: Save user profile and preferences
- `scripting`: Inject content scripts for extraction
- `host_permissions`: Access job sites for content extraction

## 🚀 Roadmap

### Version 2.0 (Upcoming)
- [ ] AI-powered cover letter generation
- [ ] Integration with major job application platforms
- [ ] Advanced analytics and tracking
- [ ] Team collaboration features for recruiters

### Version 2.1 (Future)
- [ ] Mobile app companion
- [ ] LinkedIn profile optimization
- [ ] Interview preparation assistant
- [ ] Salary negotiation insights

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Areas for Contribution
- Additional job site support
- Enhanced keyword extraction algorithms
- New resume templates
- Improved ATS scoring accuracy
- UI/UX enhancements

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Common Issues
- **Extension not loading**: Ensure developer mode is enabled
- **Job description not extracting**: Try the manual paste option
- **Resume not generating**: Check that profile is complete

### Get Help
- Create an issue on GitHub
- Email support: support@atsresumegenerator.com
- Join our Discord community: [discord.gg/atsresume](https://discord.gg/atsresume)

## 🙏 Acknowledgments

- Chrome Extension documentation and community
- Tailwind CSS for the styling framework
- Open source NLP libraries for keyword extraction
- Beta testers and early adopters

---

**Made with ❤️ for job seekers worldwide**

*Helping you get past the ATS and into your dream job!*