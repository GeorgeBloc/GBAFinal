/**
 * George Alexander Portfolio - Main JavaScript
 * Handles hero animations and scroll-based effects
 */

(function() {
    'use strict';

    // Force scroll to top on page load/refresh
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // Clear any URL hash so the browser doesn't auto-scroll to an anchor
    if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    }

    window.scrollTo(0, 0);

    document.addEventListener('DOMContentLoaded', function() {
        window.scrollTo(0, 0);
        initHeroAnimation();
        initLogoFadeIn();
        initHamburger();
    });

    window.addEventListener('load', function() {
        window.scrollTo(0, 0);
    });

    window.addEventListener('beforeunload', function() {
        window.scrollTo(0, 0);
    });

    /**
     * Hero Title Animation Sequence
     */
    function initHeroAnimation() {
        const greeting = document.getElementById('greeting');
        const intro = document.getElementById('intro');
        const finalName = document.getElementById('finalName');

        console.log('=== HERO ANIMATION INIT ===');
        console.log('greeting:', greeting);
        console.log('intro:', intro);
        console.log('finalName:', finalName);

        if (!greeting || !intro || !finalName) {
            console.error('Missing hero elements!');
            return;
        }

        // Get child elements
        const imText = intro.querySelector('.im-text');
        const georgeText = intro.querySelector('.george-text');
        const firstName = finalName.querySelector('.first-name');
        const middleName = finalName.querySelector('.middle-name');
        const lastName = finalName.querySelector('.last-name');

        console.log('imText:', imText);
        console.log('georgeText:', georgeText);
        console.log('firstName:', firstName);
        console.log('middleName:', middleName);
        console.log('lastName:', lastName);

        const georgeSpan = greeting.querySelector('.george');
        const emojiSpan = greeting.querySelector('.emoji');

        const hiText = greeting.querySelector('.hi-text');

        // STEP 1: Show greeting container, then "Hi..." slides up (300ms)
        setTimeout(() => {
            greeting.style.opacity = '1';
            greeting.style.transform = 'translateX(-50%) translateY(0)';
            if (hiText) {
                hiText.style.opacity = '1';
                hiText.style.transform = 'translateY(0)';
            }
        }, 300);

        // STEP 1b: "I'm George" + emoji fade in after "Hi..." (1500ms)
        setTimeout(() => {
            if (georgeSpan) {
                georgeSpan.style.opacity = '1';
                georgeSpan.style.transform = 'translateY(0)';
            }
            if (emojiSpan) {
                emojiSpan.style.opacity = '1';
                emojiSpan.style.transform = 'translateY(0)';
                // Start waving after the fade-in transition finishes
                setTimeout(() => {
                    emojiSpan.classList.add('waving');
                }, 600);
            }
        }, 1500);
        
        // STEP 2: Hide greeting (4000ms)
        setTimeout(() => {
            greeting.style.opacity = '0';
            greeting.style.transform = 'translateX(-50%) translateY(-20px)';
        }, 4000);

        // STEP 3: Show "I'm exploring opportunities" (4600ms)
        setTimeout(() => {
            greeting.style.display = 'none';
            intro.style.opacity = '1';
            intro.style.transform = 'translateX(-50%) translateY(0)';
        }, 4600);

        // STEP 4: Fade out intro (6200ms)
        setTimeout(() => {
            intro.style.opacity = '0';
            intro.style.transform = 'translateX(-50%) translateY(-20px)';
        }, 6200);

        // STEP 5: Show final message (6800ms)
        setTimeout(() => {
            intro.style.visibility = 'hidden';

            // Show finalName container
            finalName.style.display = 'block';
            finalName.style.opacity = '1';
            finalName.style.visibility = 'visible';

            // Animate "Let's"
            setTimeout(() => {
                console.log('Animate first part');
                if (firstName) {
                    firstName.style.opacity = '1';
                    firstName.style.transform = 'translateY(0)';
                }
            }, 100);

            // Animate "work"
            setTimeout(() => {
                console.log('Animate second part');
                if (middleName) {
                    middleName.style.opacity = '1';
                    middleName.style.transform = 'translateY(0)';
                }
            }, 200);

            // Animate "together?"
            setTimeout(() => {
                console.log('Animate third part');
                if (lastName) {
                    lastName.style.opacity = '1';
                    lastName.style.transform = 'translateY(0)';
                }
            }, 300);

        }, 6800);
    }

    /**
     * Mobile Hamburger Menu
     */
    function initHamburger() {
        const btn = document.querySelector('.nav-hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (!btn || !navLinks) return;

        btn.addEventListener('click', function() {
            const isOpen = navLinks.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen);
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('open');
                btn.setAttribute('aria-expanded', false);
            });
        });
    }

    /**
     * Experience Logos Fade In on Scroll
     */
    function initLogoFadeIn() {
        const experienceLogos = document.querySelector('.experience-logos');

        if (!experienceLogos) {
            console.log('No experience logos section found');
            return;
        }

        const items = experienceLogos.querySelectorAll('.experience-item');
        console.log('Found', items.length, 'experience items');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    console.log('Experience section visible');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        observer.observe(experienceLogos);
    }

})();
