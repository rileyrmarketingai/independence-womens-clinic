// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Booking Form Submission
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        
        // In a real application, this would send data to a server
        console.log('Appointment Request:', data);
        
        // Show success message
        alert('Thank you! Your appointment request has been received. We will contact you within 24 hours to confirm your appointment.');
        
        // Reset form
        bookingForm.reset();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Set minimum date for appointment booking (today)
const preferredDateInput = document.getElementById('preferredDate');
if (preferredDateInput) {
    const today = new Date().toISOString().split('T')[0];
    preferredDateInput.setAttribute('min', today);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .feature-item');
animateElements.forEach(el => observer.observe(el));

// Form validation enhancement
const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
    });
    
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    });
}

// Add loading state to buttons
const buttons = document.querySelectorAll('button[type="submit"]');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if (this.form && this.form.checkValidity()) {
            this.classList.add('loading');
            this.disabled = true;
            
            // Re-enable after 3 seconds (in case of error)
            setTimeout(() => {
                this.classList.remove('loading');
                this.disabled = false;
            }, 3000);
        }
    });
});

// Console welcome message
console.log('%cIndependence Women\'s Clinic', 'color: #0066A1; font-size: 24px; font-weight: bold;');
console.log('%cServing Eastern Jackson County for nearly 70 years', 'color: #4B5563; font-size: 14px;');
