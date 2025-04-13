document.addEventListener('DOMContentLoaded', function() {
    // Get the button using the class name
    const scrollButton = document.querySelector('.scroll-top');
    
    // Show/hide button based on scroll position
    window.onscroll = function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    };
    
    // Add click event to scroll to top
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
