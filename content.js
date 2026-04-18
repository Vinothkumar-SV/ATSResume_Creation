// ATS Resume Generator - Content Script
console.log('ATS Resume Generator content script loaded');

// Simple message listener
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkPage') {
    sendResponse({ status: 'ok' });
  }
});
