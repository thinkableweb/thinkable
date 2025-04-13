// Smooth scroll script for Webflow with quad-out easing
// Works across all pages including after navigation
// Clickable div class: scroll-target
// Target section ID: target-section
'use strict';

// Quad-out easing function
function easeOutQuad(t) {
    return t * (2 - t);
}

// Custom smooth scroll function with quad-out easing
function smoothScrollTo(targetY, duration) {
    var startY = window.scrollY;
    var difference = targetY - startY;
    var startTime = null;
    
    function step(currentTime) {
        if (startTime === null) {
            startTime = currentTime;
        }
        
        var timeElapsed = currentTime - startTime;
        var progress = Math.min(timeElapsed / duration, 1);
        var easeProgress = easeOutQuad(progress);
        
        window.scrollTo(0, startY + difference * easeProgress);
        
        if (timeElapsed < duration) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

// Event handler function for scroll clicks
function handleScrollClick(e) {
    e.preventDefault();
    
    // Find the target section
    var targetSection = document.getElementById('target-section');
    
    if (targetSection) {
        // Get target section's position
        var targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
        
        // Use custom smooth scroll with quad-out easing (duration in ms)
        smoothScrollTo(targetPosition, 800);
    }
}

// Function to initialize scroll functionality
function initSmoothScroll() {
    // Find all elements with the 'scroll-target' class
    var scrollTriggers = document.querySelectorAll('.scroll-target');
    
    if (scrollTriggers.length > 0) {
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
}

// Initialize on multiple events to ensure it works across page loads
function setupInitializers() {
    // Standard document ready
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
    
    // Window load event
    window.addEventListener('load', initSmoothScroll);
    
    // For browser history navigation
    window.addEventListener('popstate', initSmoothScroll);
    
    // For Webflow specific events
    if (window.Webflow) {
        window.Webflow.push(initSmoothScroll);
    }
    
    // Set up MutationObserver to watch for DOM changes
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function() {
            // Check if our target elements exist
            if (document.querySelectorAll('.scroll-target').length > 0 && 
                document.getElementById('target-section')) {
                initSmoothScroll();
            }
        });
    });
    
    // Start observing once DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
    
    // Fallback: Check every second for the first 10 seconds
    var checkCount = 0;
    var checkInterval = setInterval(function() {
        if (document.querySelectorAll('.scroll-target').length > 0) {
            initSmoothScroll();
        }
        checkCount++;
        if (checkCount >= 10) {
            clearInterval(checkInterval);
        }
    }, 1000);
    
    // For jQuery compatibility if available
    if (typeof jQuery !== 'undefined') {
        jQuery(document).ready(initSmoothScroll);
        jQuery(window).on('load', initSmoothScroll);
        jQuery(document).on('page:load turbolinks:load pjax:success', initSmoothScroll);
    }
}

// Start the whole process
setupInitializers();
