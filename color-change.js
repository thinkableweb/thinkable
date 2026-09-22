// Random Color Change on Load
document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        '#E83C00',  // Orange
        '#0d00ff',  // Blue
        '#510296',  // Purple
        '#5b1fff',  // Violet 
        '#D10000',  // Red
        '#ff1f3a',  // Berry
        '#000000'   // Black
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty('--thinkable-color', randomColor);
});
