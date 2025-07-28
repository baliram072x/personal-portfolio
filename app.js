// Advanced Portfolio JavaScript with Modern ES6+ Features

class PortfolioApp {
  constructor() {
    this.init();
    this.bindEvents();
    this.initAnimations();
  }

  init() {
    // Initialize all components
    this.initLoadingScreen();
    this.initNavigation();
    this.initTypingAnimation();
    this.initScrollProgress();
    this.initRevealAnimations();
    this.initCounters();
    this.initSkillBars();
    this.initPortfolioFilter();
    this.initTestimonialCarousel();
    this.initContactForm();
    this.initParallaxEffects();
  }

  bindEvents() {
    // Scroll events
    window.addEventListener('scroll', this.throttle(this.handleScroll.bind(this), 16));
    
    // Resize events
    window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    
    // Load events
    window.addEventListener('load', this.handleLoad.bind(this));
  }

  // Utility functions
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Loading Screen
  initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = 'visible';
      
      // Start entrance animations
      this.startEntranceAnimations();
    }, 2000);
  }

  startEntranceAnimations() {
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animation = `slideInLeft 1s ease ${index * 0.2}s both`;
      }, index * 100);
    });
  }

  // Navigation
  initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }

        // Close mobile menu
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Update active navigation link on scroll
    this.updateActiveNavLink();
  }

  updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 100;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  // Typing Animation
  initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    const phrases = [
      'Full Stack Developer',
      'UI/UX Designer',
      'Problem Solver',
      'Creative Thinker'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typePhrase = () => {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
      }

      setTimeout(typePhrase, typingSpeed);
    };

    setTimeout(typePhrase, 1000);
  }

  // Scroll Progress
  initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      scrollProgress.style.transform = `scBaliram(${progress / 100})`;
    });
  }

  // Scroll Effects
  handleScroll() {
    const navbar = document.getElementById('navbar');
    const scrollY = window.scrollY;

    // Navbar scroll effect
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Reveal animations
    this.revealOnScroll();
    
    // Parallax effects
    this.updateParallaxEffects();
  }

  // Reveal Animations
  initRevealAnimations() {
    this.observeElements();
  }

  observeElements() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }

  revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal:not(.active)');
    
    reveals.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  }

  // Animated Counters
  initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Skill Bars Animation
  initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skillBar = entry.target;
          const width = skillBar.getAttribute('data-width');
          
          setTimeout(() => {
            skillBar.style.width = `${width}%`;
          }, 300);
          
          observer.unobserve(skillBar);
        }
      });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));
  }

  // Portfolio Filter
  initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter portfolio items
        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Testimonial Carousel
  initTestimonialCarousel() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    const totalSlides = testimonialItems.length;

    const showSlide = (index) => {
      testimonialItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
      });
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
      
      currentSlide = index;
    };

    const nextSlide = () => {
      const next = (currentSlide + 1) % totalSlides;
      showSlide(next);
    };

    const prevSlide = () => {
      const prev = (currentSlide - 1 + totalSlides) % totalSlides;
      showSlide(prev);
    };

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });

    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pause auto-play on hover
    const carousel = document.querySelector('.testimonials-carousel');
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    carousel.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    });
  }

  // Contact Form
  initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');

    // Enhanced form validation and styling
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        this.clearValidationError(input);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldType = field.type;
    
    let isValid = true;
    let errorMessage = '';

    if (!value) {
      isValid = false;
      errorMessage = 'This field is required';
    } else if (fieldType === 'email' && !this.isValidEmail(value)) {
      isValid = false;
      errorMessage = 'Please enter a valid email address';
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      this.clearValidationError(field);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showFieldError(field, message) {
    field.style.borderColor = '#ff6b6b';
    
    let errorElement = field.parentNode.querySelector('.error-message');
    if (!errorElement) {
      errorElement = document.createElement('span');
      errorElement.className = 'error-message';
      errorElement.style.cssText = `
        color: #ff6b6b;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
      `;
      field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
  }

  clearValidationError(field) {
    field.style.borderColor = '';
    const errorElement = field.parentNode.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  async handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate all fields
    const inputs = form.querySelectorAll('input, textarea');
    let isFormValid = true;
    
    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      this.showNotification('Please fix the errors above', 'error');
      return;
    }

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    try {
      // Simulate form submission
      await this.simulateFormSubmission(data);
      
      this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      form.reset();
      
      // Clear floating labels
      inputs.forEach(input => {
        input.blur();
      });
      
    } catch (error) {
      this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  }

  simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success/failure
        if (Math.random() > 0.1) {
          resolve(data);
        } else {
          reject(new Error('Submission failed'));
        }
      }, 2000);
    });
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(400px);
      transition: transform 0.3s ease;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;

    // Set background color based on type
    const colors = {
      success: '#10b981',
      error: '#ef4444',
      info: '#3b82f6'
    };
    notification.style.background = colors[type] || colors.info;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Hide notification
    setTimeout(() => {
      notification.style.transform = 'translateX(400px)';
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 5000);
  }

  // Parallax Effects
  initParallaxEffects() {
    this.parallaxElements = document.querySelectorAll('.hero-particles, .floating-icon');
  }

  updateParallaxEffects() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    this.parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      element.style.transform = `translateY(${rate * speed}px)`;
    });
  }

  // Animations
  initAnimations() {
    // Add reveal class to elements that should be animated
    const animatedElements = document.querySelectorAll(`
      .section-header,
      .about-text,
      .about-image,
      .skill-category,
      .service-card,
      .portfolio-item,
      .testimonial-item,
      .contact-info,
      .contact-form
    `);

    animatedElements.forEach(el => {
      el.classList.add('reveal');
    });

    // Enhanced hover effects for interactive elements
    this.initHoverEffects();
  }

  initHoverEffects() {
    // Service cards advanced hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });

    // Portfolio items magnetic effect
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        item.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) translateY(-5px)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
      button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Handle window resize
  handleResize() {
    // Recalculate animations and layouts if needed
    this.updateParallaxEffects();
  }

  // Handle page load
  handleLoad() {
    // Ensure all images and resources are loaded
    document.body.classList.add('loaded');
  }
}

// Custom cursor effect (optional enhancement)
class CustomCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      background: var(--secondary-color);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: transform 0.1s ease;
      opacity: 0;
    `;
    document.body.appendChild(this.cursor);

    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX + 'px';
      this.cursor.style.top = e.clientY + 'px';
      this.cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
    });

    // Scale cursor on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .filter-btn');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        this.cursor.style.background = 'var(--accent-color)';
      });

      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        this.cursor.style.background = 'var(--secondary-color)';
      });
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
  
  // Initialize custom cursor for desktop devices
  if (window.innerWidth > 768) {
    new CustomCursor();
  }
});

// Add some additional utility functions for enhanced interactivity
const Utils = {
  // Smooth scroll to element
  scrollToElement: (element, offset = 0) => {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  },

  // Check if element is in viewport
  isInViewport: (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  // Generate random number between min and max
  random: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Format date
  formatDate: (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PortfolioApp, CustomCursor, Utils };
}