// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = ['extract', 'profile', 'generate'];
    const tabButtons = tabs.map(tab => document.getElementById(`tab-${tab}`));
    const tabContents = tabs.map(tab => document.getElementById(`content-${tab}`));

    // Tab switching
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Update tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('bg-blue-600', 'text-white');
                btn.classList.add('text-gray-600');
            });
            button.classList.add('bg-blue-600', 'text-white');
            button.classList.remove('text-gray-600');

            // Update tab contents
            tabContents.forEach(content => content.classList.add('hidden'));
            tabContents[index].classList.remove('hidden');
        });
    });

    // Initialize data
    let jobDescription = '';
    let extractedKeywords = [];
    let userProfile = {};
    let atsScore = 0;

    // Load saved data
    loadSavedData();

    // Event listeners
    document.getElementById('extract-from-page').addEventListener('click', extractFromCurrentPage);
    document.getElementById('analyze-jd').addEventListener('click', analyzeJobDescription);
    document.getElementById('generate-resume').addEventListener('click', generateResume);

    // Auto-save profile data
    const profileFields = ['first-name', 'last-name', 'email', 'phone', 'summary', 'skills'];
    profileFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', saveProfileData);
        }
    });

    // Auto-save job description
    document.getElementById('job-description').addEventListener('input', function() {
        jobDescription = this.value;
        chrome.storage.local.set({ jobDescription });
    });

    function loadSavedData() {
        chrome.storage.local.get(['jobDescription', 'userProfile', 'extractedKeywords'], function(result) {
            if (result.jobDescription) {
                document.getElementById('job-description').value = result.jobDescription;
                jobDescription = result.jobDescription;
            }
            if (result.userProfile) {
                userProfile = result.userProfile;
                // Populate profile fields
                Object.keys(userProfile).forEach(key => {
                    const field = document.getElementById(key);
                    if (field) field.value = userProfile[key] || '';
                });
            }
            if (result.extractedKeywords) {
                extractedKeywords = result.extractedKeywords;
                displayExtractedKeywords();
                calculateATSScore();
            }
        });
    }

    function saveProfileData() {
        profileFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                userProfile[fieldId] = field.value;
            }
        });
        chrome.storage.local.set({ userProfile });
        calculateATSScore();
    }

    function extractFromCurrentPage() {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: extractJobDescriptionFromPage
            }, function(result) {
                if (result && result[0] && result[0].result) {
                    document.getElementById('job-description').value = result[0].result;
                    jobDescription = result[0].result;
                    chrome.storage.local.set({ jobDescription });
                }
            });
        });
    }

    function analyzeJobDescription() {
        const jdText = document.getElementById('job-description').value;
        if (!jdText.trim()) {
            alert('Please enter a job description first.');
            return;
        }

        jobDescription = jdText;
        extractedKeywords = extractKeywords(jdText);
        
        chrome.storage.local.set({ jobDescription, extractedKeywords });
        
        displayExtractedKeywords();
        calculateATSScore();
        
        // Switch to profile tab
        document.getElementById('tab-profile').click();
    }

    function extractKeywords(text) {
        // Simple keyword extraction - in a real app, you'd use more sophisticated NLP
        const commonSkills = [
            'javascript', 'python', 'java', 'react', 'angular', 'vue', 'node.js', 'express',
            'sql', 'mongodb', 'postgresql', 'mysql', 'aws', 'azure', 'docker', 'kubernetes',
            'git', 'agile', 'scrum', 'rest', 'api', 'microservices', 'devops', 'ci/cd',
            'html', 'css', 'typescript', 'redux', 'graphql', 'jenkins', 'terraform',
            'machine learning', 'ai', 'data science', 'analytics', 'tableau', 'power bi'
        ];

        const requirements = [
            'bachelor', 'master', 'degree', 'certification', 'experience', 'years',
            'senior', 'junior', 'lead', 'architect', 'manager', 'developer', 'engineer'
        ];

        const textLower = text.toLowerCase();
        const foundKeywords = [];

        // Extract skills
        commonSkills.forEach(skill => {
            if (textLower.includes(skill.toLowerCase())) {
                foundKeywords.push({
                    text: skill,
                    type: 'skill',
                    importance: getKeywordImportance(textLower, skill)
                });
            }
        });

        // Extract requirements
        requirements.forEach(req => {
            if (textLower.includes(req.toLowerCase())) {
                foundKeywords.push({
                    text: req,
                    type: 'requirement',
                    importance: getKeywordImportance(textLower, req)
                });
            }
        });

        // Extract years of experience
        const experienceMatch = textLower.match(/(\d+)\+?\s*years?\s*(of\s*)?(experience|exp)/g);
        if (experienceMatch) {
            experienceMatch.forEach(match => {
                foundKeywords.push({
                    text: match,
                    type: 'experience',
                    importance: 5
                });
            });
        }

        return foundKeywords.sort((a, b) => b.importance - a.importance).slice(0, 20);
    }

    function getKeywordImportance(text, keyword) {
        const keywordRegex = new RegExp(keyword.toLowerCase(), 'g');
        const matches = text.match(keywordRegex);
        return matches ? matches.length : 0;
    }

    function displayExtractedKeywords() {
        const container = document.getElementById('extracted-keywords');
        const analysisDiv = document.getElementById('jd-analysis');
        
        if (extractedKeywords.length > 0) {
            container.innerHTML = extractedKeywords.map(keyword => 
                `<span class="keyword-tag extracted">${keyword.text}</span>`
            ).join('');
            analysisDiv.classList.remove('hidden');
        }
    }

    function calculateATSScore() {
        if (!extractedKeywords.length || !userProfile.skills) {
            atsScore = 0;
            updateATSDisplay();
            return;
        }

        const userSkills = userProfile.skills.toLowerCase().split(',').map(s => s.trim());
        const jdKeywords = extractedKeywords.map(k => k.text.toLowerCase());
        
        const matchedKeywords = [];
        const missingKeywords = [];

        jdKeywords.forEach(keyword => {
            const isMatched = userSkills.some(skill => 
                skill.includes(keyword) || keyword.includes(skill)
            );
            
            if (isMatched) {
                matchedKeywords.push(keyword);
            } else {
                missingKeywords.push(keyword);
            }
        });

        atsScore = Math.round((matchedKeywords.length / jdKeywords.length) * 100);
        
        updateATSDisplay();
        displayKeywordMatches(matchedKeywords, missingKeywords);
    }

    function updateATSDisplay() {
        document.getElementById('ats-score').textContent = `${atsScore}%`;
        document.getElementById('ats-progress').style.width = `${atsScore}%`;
        
        let feedback = '';
        let color = '';
        
        if (atsScore >= 80) {
            feedback = 'Excellent match! Your profile aligns well with the job requirements.';
            color = 'text-green-600';
        } else if (atsScore >= 60) {
            feedback = 'Good match! Consider adding some missing keywords to improve your score.';
            color = 'text-yellow-600';
        } else if (atsScore >= 40) {
            feedback = 'Fair match. You may want to highlight more relevant skills.';
            color = 'text-orange-600';
        } else {
            feedback = 'Low match. Consider tailoring your profile to better match the job requirements.';
            color = 'text-red-600';
        }
        
        const feedbackElement = document.getElementById('ats-feedback');
        feedbackElement.textContent = feedback;
        feedbackElement.className = `mt-2 text-sm ${color}`;
    }

    function displayKeywordMatches(matched, missing) {
        const matchedContainer = document.getElementById('matched-list');
        const missingContainer = document.getElementById('missing-list');
        const matchedDiv = document.getElementById('matched-keywords');
        const missingDiv = document.getElementById('missing-keywords');

        if (matched.length > 0) {
            matchedContainer.innerHTML = matched.map(keyword => 
                `<span class="keyword-tag matched">${keyword}</span>`
            ).join('');
            matchedDiv.classList.remove('hidden');
        }

        if (missing.length > 0) {
            missingContainer.innerHTML = missing.map(keyword => 
                `<span class="keyword-tag missing">${keyword}</span>`
            ).join('');
            missingDiv.classList.remove('hidden');
        }
    }

    function generateResume() {
        if (!jobDescription.trim()) {
            alert('Please analyze a job description first.');
            return;
        }

        if (!userProfile['first-name'] || !userProfile['last-name']) {
            alert('Please complete your profile information.');
            return;
        }

        const generateBtn = document.getElementById('generate-resume');
        const statusDiv = document.getElementById('generation-status');
        const successDiv = document.getElementById('success-message');

        generateBtn.disabled = true;
        statusDiv.classList.remove('hidden');
        successDiv.classList.add('hidden');

        // Simulate resume generation process
        setTimeout(() => {
            try {
                createWordDocument();
                
                generateBtn.disabled = false;
                statusDiv.classList.add('hidden');
                successDiv.classList.remove('hidden');
                
                // Hide success message after 3 seconds
                setTimeout(() => {
                    successDiv.classList.add('hidden');
                }, 3000);
            } catch (error) {
                console.error('Error generating resume:', error);
                alert('Error generating resume. Please try again.');
                generateBtn.disabled = false;
                statusDiv.classList.add('hidden');
            }
        }, 2000);
    }

    function createWordDocument() {
        // This would use the docx library to create a Word document
        // For now, we'll create a simple text-based resume
        const resumeContent = generateResumeContent();
        
        // Create and download the resume
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${userProfile['first-name']}_${userProfile['last-name']}_Resume_ATS_${atsScore}%.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function generateResumeContent() {
        const name = `${userProfile['first-name']} ${userProfile['last-name']}`;
        const email = userProfile.email || '';
        const phone = userProfile.phone || '';
        const summary = userProfile.summary || '';
        const skills = userProfile.skills || '';

        return `
ATS RESUME - MATCH SCORE: ${atsScore}%
${'='.repeat(50)}

${name.toUpperCase()}
${email} | ${phone}

PROFESSIONAL SUMMARY
${'-'.repeat(30)}
${summary}

TECHNICAL SKILLS
${'-'.repeat(30)}
${skills}

KEY QUALIFICATIONS
${'-'.repeat(30)}
${extractedKeywords.slice(0, 10).map(k => `• ${k.text}`).join('\n')}

MATCHED KEYWORDS FROM JOB DESCRIPTION
${'-'.repeat(30)}
${extractedKeywords.filter(k => {
    const userSkillsLower = skills.toLowerCase();
    return userSkillsLower.includes(k.text.toLowerCase());
}).map(k => `✓ ${k.text}`).join('\n')}

OPTIMIZATION NOTES
${'-'.repeat(30)}
• This resume has been optimized for ATS (Applicant Tracking System)
• Keywords have been strategically placed to match job requirements
• Current ATS match score: ${atsScore}%
• Generated on: ${new Date().toLocaleDateString()}

${'='.repeat(50)}
Generated by ATS Resume Generator Chrome Extension
        `.trim();
    }
});

// Function to extract job description from current page
function extractJobDescriptionFromPage() {
    // Look for common job description containers
    const selectors = [
        '[data-testid="jobsearch-jobDescriptionText"]', // Indeed
        '.jobsearch-jobDescriptionText', // Indeed alternative
        '.job-description', // Generic
        '.job-details', // Generic
        '.description', // Generic
        '[class*="job-description"]', // Partial match
        '[class*="description"]', // Partial match
        'section[data-section="jobDescription"]', // LinkedIn
        '.jobs-description', // LinkedIn alternative
    ];

    for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
            return element.innerText.trim();
        }
    }

    // Fallback: try to find the longest text content
    const paragraphs = Array.from(document.querySelectorAll('p, div'));
    const longestText = paragraphs
        .map(p => p.innerText?.trim() || '')
        .filter(text => text.length > 100)
        .sort((a, b) => b.length - a.length)[0];

    return longestText || 'Could not extract job description from this page. Please copy and paste manually.';
}