// Detect sections that are in the viewport and add the "visible" class
const sections = document.querySelectorAll('.bubble-content');

function revealSections() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.8) { // Trigger reveal when 80% of section is visible
            section.classList.add('visible');
        }
    });
}

// Listen for scroll events to trigger reveal
window.addEventListener('scroll', revealSections);

// Initial check to reveal any section already in view
revealSections();
