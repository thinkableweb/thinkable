// Random Color Change on Load
document.addEventListener('DOMContentLoaded', function() {
    const colors = [
        '#E83C00',  // Orange
        '#0d00ff',  // Blue
        '#3b007a',  // Purple
        '#D10000',  // Red
        '#000000'   // Black
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    document.documentElement.style.setProperty('--thinkable-color', randomColor);
});
