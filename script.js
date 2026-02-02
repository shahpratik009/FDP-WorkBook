// ===========================
// Navigation Menu Toggle
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Toggle mobile menu when hamburger is clicked
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// Smooth Scroll Behavior
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Intersection Observer for Animations
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section elements
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// ===========================
// Scroll-based Navigation Highlight
// ===========================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Contact Form Handling
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.elements[0].value;
        const email = contactForm.elements[1].value;
        const subject = contactForm.elements[2].value;
        const message = contactForm.elements[3].value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate form submission (in a real scenario, this would send to a server)
        console.log('Form Data:', {
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            animation: slideInDown 0.3s ease;
        `;
        successMessage.textContent = 'Message sent successfully! Thank you for reaching out.';
        document.body.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);

        // Reset form
        contactForm.reset();
    });
}

// ===========================
// Counter Animation for Quick Facts
// ===========================

const counterElements = document.querySelectorAll('.fact h3');

const startCounting = (element) => {
    const target = parseInt(element.getAttribute('data-target')) || 0;

    if (target === 0) {
        return;
    }

    let current = 0;
    const increment = target / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 30);
};

// Intersection observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const h3 = entry.target.querySelector('h3');
            if (h3 && !h3.classList.contains('counted')) {
                const number = h3.textContent.replace(/[^\d]/g, '');
                h3.setAttribute('data-target', number);
                startCounting(h3);
                h3.classList.add('counted');
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.fact').forEach(fact => {
    counterObserver.observe(fact);
});

// ===========================
// Skill Cards Hover Animation
// ===========================

const skillCards = document.querySelectorAll('.skill-category');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// Project Cards Interaction
// ===========================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1.15)';
        }
    });

    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// ===========================
// Parallax Effect on Hero Section
// ===========================

window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// ===========================
// Add Fade-in Animation for Elements
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .nav-link.active {
        color: #3498db;
        border-bottom: 2px solid #3498db;
        padding-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);

// ===========================
// Lazy Loading for Images
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Print/Resume Download Functionality
// ===========================

function downloadResume() {
    // Create a simple PDF-like download (you can enhance this later)
    console.log('Download resume functionality can be implemented here');
    alert('Resume download functionality can be integrated with your resume file');
}

// ===========================
// Dark Mode Toggle (Optional Enhancement)
// ===========================

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ===========================
// Initialize on Page Load
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Professor Portfolio loaded successfully');

    // Add any additional initialization code here
    // Initialize tooltips, popovers, or other components
});

// ===========================
// Handle Browser Back/Forward Button
// ===========================

window.addEventListener('popstate', () => {
    // Update navigation highlight
    const current = window.location.hash.slice(1);
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Export Functions for External Use
// ===========================

window.portfolioFunctions = {
    toggleDarkMode: toggleDarkMode,
    downloadResume: downloadResume
};
