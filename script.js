// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Skill bars animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 500);
    });
};

// Trigger skill bars animation when skills section is in view
const skillsSection = document.querySelector('#skills');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkillBars();
            observer.unobserve(entry.target);
        }
    });
});

if (skillsSection) {
    observer.observe(skillsSection);
}

// Typing effect for hero title
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
};

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-item h3');
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
};

// Trigger counter animation when about section is in view
const aboutSection = document.querySelector('#about');
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
});

if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #dc3545, #fd7e14)';
    } else {
        notification.style.background = 'var(--primary-gradient)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Project card hover effects
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill item hover effects
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add loading class to elements
    const elements = document.querySelectorAll('section');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('loading');
            setTimeout(() => {
                element.classList.add('loaded');
            }, 100);
        }, index * 200);
    });
});

// Scroll to top functionality
const createScrollToTopButton = () => {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-gradient);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', () => {
        scrollButton.style.transform = 'translateY(-5px) scale(1.1)';
        scrollButton.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
    });
    
    scrollButton.addEventListener('mouseleave', () => {
        scrollButton.style.transform = 'translateY(0) scale(1)';
        scrollButton.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    });
};

// Initialize scroll to top button
createScrollToTopButton();

// Particle background effect for hero section
const createParticles = () => {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 1;
    `;
    
    hero.appendChild(particleContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        
        particleContainer.appendChild(particle);
    }
    
    // Add floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize particles
createParticles();

// Add active class to current navigation link
const addActiveNavLink = () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
};

addActiveNavLink();

// Preloader
const preloader = document.createElement('div');
preloader.className = 'preloader';
preloader.innerHTML = `
    <div class="preloader-content">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>
`;

preloader.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--bg-hero);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    transition: opacity 0.5s ease;
`;

const preloaderContent = preloader.querySelector('.preloader-content');
preloaderContent.style.cssText = `
    text-align: center;
    color: white;
`;

const spinner = preloader.querySelector('.spinner');
spinner.style.cssText = `
    width: 50px;
    height: 50px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top: 3px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;
`;

const spinStyle = document.createElement('style');
spinStyle.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(spinStyle);

document.body.appendChild(preloader);

// Hide preloader when page is loaded
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(preloader);
        }, 500);
    }, 1000);
});

// Add CSS for active navigation link
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// Dynamic Theme Generator based on Profile Photo
function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToRgb(h, s, l) {
    h /= 360; s /= 100; l /= 100;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function extractColorsFromPhoto() {
    const imgElement = document.querySelector('.profile-img');
    if (!imgElement) return;

    if (imgElement.complete) {
        analyzeImage(imgElement);
    } else {
        imgElement.addEventListener('load', () => {
            analyzeImage(imgElement);
        });
    }
}

function analyzeImage(img) {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 100;
        canvas.height = 100;
        
        ctx.drawImage(img, 0, 0, 100, 100);
        const imgData = ctx.getImageData(0, 0, 100, 100);
        const data = imgData.data;
        
        // Corner points mapping for photo background detection (top edge only)
        const cornerPoints = [
            {x: 10, y: 10},
            {x: 90, y: 10},
            {x: 50, y: 10},
            {x: 30, y: 10},
            {x: 70, y: 10}
        ];
        
        let bgR = 0, bgG = 0, bgB = 0;
        cornerPoints.forEach(p => {
            const idx = (p.y * 100 + p.x) * 4;
            bgR += data[idx];
            bgG += data[idx+1];
            bgB += data[idx+2];
        });
        bgR = Math.round(bgR / cornerPoints.length);
        bgG = Math.round(bgG / cornerPoints.length);
        bgB = Math.round(bgB / cornerPoints.length);
        
        // Clothing mapping (bottom corners/shoulders to avoid white shirt center)
        const clothingPoints = [
            {x: 10, y: 90},
            {x: 90, y: 90},
            {x: 20, y: 95},
            {x: 80, y: 95}
        ];
        
        let subR = 0, subG = 0, subB = 0;
        clothingPoints.forEach(p => {
            const idx = (p.y * 100 + p.x) * 4;
            subR += data[idx];
            subG += data[idx+1];
            subB += data[idx+2];
        });
        subR = Math.round(subR / clothingPoints.length);
        subG = Math.round(subG / clothingPoints.length);
        subB = Math.round(subB / clothingPoints.length);
        
        applyThemeFromColors(bgR, bgG, bgB, subR, subG, subB);
    } catch (e) {
        console.warn("Dynamic color extraction disabled: standard security restrictions apply for CORS if not hosted on origin.", e);
    }
}

function applyThemeFromColors(bgR, bgG, bgB, subR, subG, subB) {
    const bgHsl = rgbToHsl(bgR, bgG, bgB);
    const subHsl = rgbToHsl(subR, subG, subB);
    
    let isLightBg = bgHsl.l > 50;
    
    let lightHsl = isLightBg ? bgHsl : subHsl;
    let darkHsl = isLightBg ? subHsl : bgHsl;
    
    // Force light bg to be very light and clean
    let lightBgL = Math.max(lightHsl.l, 94);
    let lightBgS = Math.min(lightHsl.s, 12);
    
    // Force dark colors to be very dark and rich
    let darkBgL = Math.min(darkHsl.l, 20);
    let darkBgS = Math.max(darkHsl.s, 15);
    
    // Dynamic Accent Color (e.g. periwinkle, indigo, etc.)
    let accentH = darkHsl.h;
    let accentS = Math.max(darkHsl.s, 45); 
    let accentL = Math.min(Math.max(darkHsl.l, 35), 55);
    
    const root = document.documentElement;
    
    // Set Raw Variable Outputs
    root.style.setProperty('--theme-photo-bg', `rgb(${bgR}, ${bgG}, ${bgB})`);
    root.style.setProperty('--theme-photo-subject', `rgb(${subR}, ${subG}, ${subB})`);
    
    // Set Semantic CSS theme
    root.style.setProperty('--primary-color', `hsl(${accentH}, ${accentS}%, ${accentL}%)`);
    root.style.setProperty('--primary-light', `hsl(${lightHsl.h}, ${lightHsl.s}%, ${Math.max(lightHsl.l - 5, 85)}%)`);
    root.style.setProperty('--primary-dark', `hsl(${darkHsl.h}, ${darkBgS}%, ${darkBgL}%)`);
    
    root.style.setProperty('--bg-light', `hsl(${lightHsl.h}, ${lightBgS}%, ${lightBgL}%)`);
    root.style.setProperty('--bg-hero', `linear-gradient(135deg, hsl(${darkHsl.h}, ${darkBgS}%, ${darkBgL}%) 0%, hsl(${darkHsl.h}, ${darkBgS}%, ${Math.max(darkBgL - 6, 8)}%) 100%)`);
    
    // Convert Accent HSL to RGB for opacity supports
    const accentRgb = hslToRgb(accentH, accentS, accentL);
    root.style.setProperty('--primary-color-rgb', `${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}`);
    
    // Set Gradients
    root.style.setProperty('--primary-gradient', `linear-gradient(135deg, hsl(${accentH}, ${accentS}%, ${accentL}%) 0%, hsl(${darkHsl.h}, ${darkBgS}%, ${darkBgL}%) 100%)`);
    root.style.setProperty('--accent-gradient', `linear-gradient(135deg, hsl(${accentH}, ${Math.min(accentS + 10, 100)}%, ${Math.min(accentL + 10, 80)}%) 0%, hsl(${accentH}, ${accentS}%, ${accentL}%) 100%)`);
    
    root.style.setProperty('--scrollbar-thumb', `linear-gradient(135deg, hsl(${accentH}, ${accentS}%, ${accentL}%) 0%, hsl(${darkHsl.h}, ${darkBgS}%, ${darkBgL}%) 100%)`);
    root.style.setProperty('--scrollbar-thumb-hover', `linear-gradient(135deg, hsl(${accentH}, ${Math.min(accentS + 10, 100)}%, ${Math.max(accentL - 5, 20)}%) 0%, hsl(${darkHsl.h}, ${darkBgS}%, ${Math.max(darkBgL - 5, 5)}%) 100%)`);
    
    console.log(`Theme dynamically updated from image palette (Accent: H:${accentH} S:${accentS}% L:${accentL}%)`);
}

// Initialize color extraction
extractColorsFromPhoto();

console.log('Portfolio website loaded successfully! 🚀');
