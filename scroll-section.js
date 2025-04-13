// Smooth scroll script for Webflow
// Clickable div class: scroll-target
// Target section ID: target-section

document.addEventListener('DOMContentLoaded', function() {
  // Find all elements with the 'scroll-target' class
  const scrollTriggers = document.querySelectorAll('.scroll-target');
  
  // Add click event listener to each trigger
  scrollTriggers.forEach(function(trigger) {
    trigger.addEventListener('click', function(e) {
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
    });
    
    // Add cursor pointer to indicate clickable element
    trigger.style.cursor = 'pointer';
  });
});
