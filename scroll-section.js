// Smooth scroll script for Webflow
// Clickable div class: scroll-target
// Target section ID: target-section

// Function to initialize scroll functionality
function initScrollFunctionality() {
  // Find all elements with the 'scroll-target' class
  const scrollTriggers = document.querySelectorAll('.scroll-target');
  
  // Add click event listener to each trigger
  scrollTriggers.forEach(function(trigger) {
    // Remove any existing event listeners first to prevent duplicates
    trigger.removeEventListener('click', handleScrollClick);
    // Add new event listener
    trigger.addEventListener('click', handleScrollClick);
    // Add cursor pointer to indicate clickable element
    trigger.style.cursor = 'pointer';
  });
}

// Event handler function for scroll clicks
function handleScrollClick(e) {
  e.preventDefault();
  
  // Find the target section
  const targetSection = document.getElementById('target-section');
  
  if (targetSection) {
    // Smooth scroll to the target section
    targetSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initScrollFunctionality);

// For Webflow specific events
// This helps when returning to a page after navigation
if (window.Webflow) {
  window.Webflow.push(function() {
    // Initialize when Webflow is ready
    initScrollFunctionality();
  });
}

// Additional fallback for page transitions
document.addEventListener('readystatechange', function() {
  if (document.readyState === 'complete') {
    // Add a small delay to ensure all Webflow elements are properly loaded
    setTimeout(initScrollFunctionality, 100);
  }
});

// Additional listener for Webflow page change events
window.addEventListener('load', initScrollFunctionality);

// Extra fallback - reinitialize every 2 seconds for the first 10 seconds
// This helps with some stubborn Webflow page transitions
let initCount = 0;
const initInterval = setInterval(function() {
  initScrollFunctionality();
  initCount++;
  if (initCount >= 5) {
    clearInterval(initInterval);
  }
}, 2000);
