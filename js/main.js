/* ============================================
   IMAS - Main JavaScript
   Pure Vanilla JS - No frameworks
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // 1. DOM ELEMENTS
    // ============================================
    const header = document.getElementById('header');
    const headerCtaScroll = document.querySelector('.header-cta-scroll');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const animateElements = document.querySelectorAll('.animate');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');

    // ============================================
    // 2. REDUCED MOTION DETECTION
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ============================================
    // 3. SCROLL-TRIGGERED ANIMATIONS
    // ============================================
    function initScrollAnimations() {
        if (prefersReducedMotion) {
            // If reduced motion is preferred, make all elements visible immediately
            animateElements.forEach(el => {
                el.classList.add('visible');
                el.style.opacity = '1';
            });
            return;
        }

        // IntersectionObserver for scroll-triggered animations
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all animate elements
        animateElements.forEach(el => {
            observer.observe(el);
        });

        // Staggered animations for grouped elements
        initStaggeredAnimations();
    }

    // ============================================
    // 4. STAGGERED ANIMATIONS (INDEX-BASED)
    // ============================================
    function initStaggeredAnimations() {
        const staggerContainers = document.querySelectorAll('.grid, .steps, .tech-grid, .timeline');

        staggerContainers.forEach(container => {
            const children = container.querySelectorAll('.animate');
            children.forEach((child, index) => {
                // Index-based delay: 120ms per element
                child.style.animationDelay = `${index * 120}ms`;
            });
        });
    }

    // ============================================
    // 5. STICKY HEADER WITH CTA
    // ============================================
    function initStickyHeader() {
        let lastScrollY = window.scrollY;
        const scrollThreshold = 100;

        function handleScroll() {
            const currentScrollY = window.scrollY;

            // Add/remove scrolled class for background
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Show/hide CTA button after threshold
            if (headerCtaScroll) {
                if (currentScrollY > scrollThreshold) {
                    headerCtaScroll.classList.add('visible');
                } else {
                    headerCtaScroll.classList.remove('visible');
                }
            }

            lastScrollY = currentScrollY;
        }

        // Throttled scroll handler
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // Initial check
        handleScroll();
    }

    // ============================================
    // 6. MOBILE MENU TOGGLE
    // ============================================
    function initMobileMenu() {
        if (!menuToggle || !mobileNav) return;

        function toggleMenu() {
            const isActive = menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        }

        menuToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking nav links
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // ============================================
    // 7. SMOOTH SCROLLING
    // ============================================
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');

                // Only handle hash links
                if (href && href.startsWith('#')) {
                    e.preventDefault();

                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);

                    if (targetElement) {
                        // Calculate offset for fixed header
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: prefersReducedMotion ? 'auto' : 'smooth'
                        });
                    }
                }
            });
        });
    }

    // ============================================
    // 8. CONTACT FORM SUBMISSION (WEB3FORMS)
    // ============================================
    function initContactForm() {
        if (!contactForm) return;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Hide previous messages
            formSuccess.style.display = 'none';
            formError.style.display = 'none';

            // Get form data
            const formData = new FormData(contactForm);

            // Check honeypot
            if (formData.get('botcheck')) {
                return; // Bot detected, silently fail
            }

            // Disable submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    showSuccess();
                    contactForm.reset();
                } else {
                    showError('Submission failed. Please try again.');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showError('Submission failed. Please try again.');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    function showSuccess() {
        formSuccess.style.display = 'block';
        formError.style.display = 'none';

        // Hide after 5 seconds
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 5000);
    }

    function showError(message) {
        formError.textContent = '❌ ' + message;
        formError.style.display = 'block';
        formSuccess.style.display = 'none';

        // Hide after 5 seconds
        setTimeout(() => {
            formError.style.display = 'none';
        }, 5000);
    }

    // ============================================
    // 9. KEYBOARD NAVIGATION ENHANCEMENT
    // ============================================
    function initKeyboardNav() {
        // Add visible focus styles on keyboard navigation
        document.body.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-nav');
            }
        });

        document.body.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-nav');
        });
    }

    // ============================================
    // 10. LAZY LOADING IMAGES
    // ============================================
    function initLazyLoading() {
        // Native lazy loading is already added via HTML attributes
        // This function adds fallback for older browsers
        if ('loading' in HTMLImageElement.prototype) {
            return; // Native lazy loading supported
        }

        // Fallback: use IntersectionObserver for images
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if (lazyImages.length === 0) return;

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // 11. PERFORMANCE: PASSIVE EVENT LISTENERS
    // ============================================
    function checkPassiveSupport() {
        let passiveSupported = false;
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passiveSupported = false;
        }
        return passiveSupported;
    }

    // ============================================
    // 12. PAGE LOAD ANIMATIONS
    // ============================================
    function initPageLoadAnimations() {
        // Add page-loaded class after DOM is ready
        document.body.classList.add('page-loaded');

        // Animate hero section immediately
        const heroAnimations = document.querySelectorAll('.hero .animate');
        heroAnimations.forEach((el, index) => {
            if (!prefersReducedMotion) {
                el.style.animationDelay = `${index * 150}ms`;
            }
            el.classList.add('visible');
        });
    }

    // ============================================
    // 13. INITIALIZATION
    // ============================================
    function init() {
        // Run all initializations
        initPageLoadAnimations();
        initScrollAnimations();
        initStickyHeader();
        initMobileMenu();
        initSmoothScroll();
        initContactForm();
        initKeyboardNav();
        initLazyLoading();

        console.log('IMAS: Website initialized successfully');
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
