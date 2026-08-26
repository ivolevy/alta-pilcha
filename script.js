/**
 * ALTA PILCHA
 * Interactions and scroll behaviors
 */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. MOBILE MENU TOGGLE */
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('open');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* 2. NAVBAR SCROLL STATE */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    /* 3. INTERSECTION OBSERVER FOR FADE-UP ANIMATIONS */
    const fadeElements = document.querySelectorAll('.fade-up');
    const fadeOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, fadeOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    /* 4. PRODUCT SHOWCASE CAROUSEL LOGIC */
    const carouselTrack = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');
    
    // UI elements to update
    const uiObject = document.querySelector('.active-object');
    const uiTitle = document.querySelector('.active-title');
    const uiTags = document.querySelector('.active-tags');
    const uiDesc = document.querySelector('.active-desc');
    const uiCounter = document.getElementById('current-slide');

    if (carouselTrack && slides.length > 0) {
        
        // Function to update Active UI based on slide
        const updateCarouselUI = (slide) => {
            slides.forEach(s => s.classList.remove('active'));
            slide.classList.add('active');
            
            uiObject.textContent = slide.dataset.object;
            uiTitle.textContent = slide.dataset.title;
            uiTags.textContent = slide.dataset.tags;
            uiDesc.textContent = slide.dataset.desc;
            
            const indexStr = slide.dataset.index.padStart(2, '0');
            uiCounter.textContent = indexStr;
        };

        // Scroll observer for carousel snapping
        const carouselOptions = {
            root: carouselTrack,
            rootMargin: '0px',
            threshold: 0.6 // Slide must be 60% visible to become active
        };

        const carouselObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCarouselUI(entry.target);
                }
            });
        }, carouselOptions);

        slides.forEach(slide => carouselObserver.observe(slide));

        // Buttons
        btnNext.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: window.innerWidth * 0.8, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            carouselTrack.scrollBy({ left: -window.innerWidth * 0.8, behavior: 'smooth' });
        });
        
        // Initial set
        updateCarouselUI(slides[0]);
    }

    /* 5. PRODUCT STORY STICKY SCROLL LOGIC */
    const storySection = document.querySelector('.product-story');
    const imageLayers = document.querySelectorAll('.story-image-layer');
    const textSteps = document.querySelectorAll('.story-text-step');

    if (storySection && imageLayers.length > 0 && textSteps.length > 0) {
        window.addEventListener('scroll', () => {
            const rect = storySection.getBoundingClientRect();
            // Check if section is in viewport
            if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
                
                // Calculate progress inside the sticky section (0 to 1)
                const scrollProgress = Math.abs(rect.top) / (rect.height - window.innerHeight);
                
                // Determine active step based on progress (0 to 3)
                const stepCount = imageLayers.length;
                let activeIndex = Math.floor(scrollProgress * stepCount);
                
                // Clamp index
                if (activeIndex >= stepCount) activeIndex = stepCount - 1;
                if (activeIndex < 0) activeIndex = 0;

                // Update classes
                imageLayers.forEach((layer, i) => {
                    layer.classList.toggle('active', i === activeIndex);
                });
                
                textSteps.forEach((step, i) => {
                    step.classList.toggle('active', i === activeIndex);
                });
            }
        }, { passive: true });
    }

});
