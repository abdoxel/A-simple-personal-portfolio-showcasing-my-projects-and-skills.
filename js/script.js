// ===================================
// Mobile Navigation
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // ===================================
    // Contact Form Validation
    // ===================================
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form
            let isValid = true;
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                showError('subject', 'Please enter a subject');
                isValid = false;
            } else if (subject.length < 3) {
                showError('subject', 'Subject must be at least 3 characters');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // Show result
            if (isValid) {
                // Simulate form submission
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you soon.';
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fix the errors above and try again.';
                formMessage.style.display = 'block';
            }
        });
    }

    // ===================================
    // Helper Functions
    // ===================================
    
    // Show error message
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (field && errorElement) {
            field.parentElement.classList.add('error');
            errorElement.textContent = message;
        }
    }
    
    // Clear all errors
    function clearErrors() {
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            group.classList.remove('error');
        });
        
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
        });
        
        if (formMessage) {
            formMessage.style.display = 'none';
        }
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ===================================
    // Smooth Scroll for Anchor Links
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===================================
    // Add Active Class to Current Page
    // ===================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksItems = document.querySelectorAll('.nav-links a');
    
    navLinksItems.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ===================================
    // Intersection Observer for Animations
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards, project cards, and skill cards
    const animatedElements = document.querySelectorAll('.service-card, .project-card, .skill-card, .tech-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ===================================
    // Project Button Click Handlers
    // ===================================
    const projectButtons = document.querySelectorAll('.project-card .btn-outline');
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
            alert(`This would open the ${projectTitle} project. In a real implementation, this would navigate to the project page or open a modal.`);
        });
    });

    // ===================================
    // Download CV Button Handler
    // ===================================
    const downloadCVButton = document.querySelector('.download-cv');
    if (downloadCVButton) {
        downloadCVButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('This would download the CV/resume. In a real implementation, this would link to a PDF file.');
        });
    }
});
