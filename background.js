// ATS Resume Generator - Background Service Worker
console.log('ATS Resume Generator background script loaded');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeJob') {
    sendResponse({ success: true, message: 'Analyzed' });
  }
});
