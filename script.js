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

// Visualizer Canvas
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

// Create particle class
class Particle {
    constructor(x, y, size, color, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    // Draw the particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Reset particles if they go off-screen
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
        }
    }
}

// Initialize particles
function initParticles() {
    particlesArray = [];
    const numberOfParticles = 100;
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1; // Size range: 1-4
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const color = 'rgba(255, 99, 71, 0.8)'; // Light coral color
        const velocityX = (Math.random() - 0.5) * 2; // Horizontal speed
        const velocityY = (Math.random() - 0.5) * 2; // Vertical speed
        particlesArray.push(new Particle(x, y, size, color, velocityX, velocityY));
    }
}

// Animate particles
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Start the animation
initParticles();
animateParticles();
