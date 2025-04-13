* Base link styling */
a.underline-link {
    position: relative !important;
    text-decoration: none !important;
    border-bottom: 1px solid currentColor !important; /* Static 1px underline */
}

/* Hover effect underline */
/* Hover effect underline */
a[id*="underline-link"]::after {
    content: '' !important;
    position: absolute !important;
    width: 100% !important;
    height: 2px !important; /* Thicker hover effect */
    bottom: -1px !important; /* Aligned with static underline */
    left: 0 !important;
    background-color: currentColor !important;
    transform: scaleX(0) !important;
    transform-origin: right !important;
    transition: transform 0.3s ease !important;
    pointer-events: none !important;
}

/* Hover animation */
a[id*="underline-link"]:hover::after {
    transform: scaleX(1) !important;
    transform-origin: left !important;
}

/* Different distances - adjusted to account for static underline */
#underline-link-4::after {
    bottom: -3px !important;
}

#underline-link-6::after {
    bottom: -5px !important;
}

#underline-link-8::after {
    bottom: -7px !important;
}
