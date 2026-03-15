/**
 * Brodie Leiser - Mechanical Engineering Portfolio | Interactive Logic v4.0
 * 
 * This script manages the interactive layer of the site, including:
 * - High-performance scroll-reveal animations for the asymmetrical layout.
 * - Smooth scrolling for anchor links.
 * - Ensures animations only run after the page is fully ready to prevent flashes.
 */

// Configuration for the IntersectionObserver
const SCROLL_REVEAL_CONFIG = {
    threshold: 0.1,                // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -10% 0px' // Trigger animation a bit before it's fully in view
};

/**
 * Primary initialization function. Fired once the DOM is fully loaded.
 */
function main() {
    // Add a class to the body to indicate that JS is active.
    // This prevents a flash of unanimated content on page load.
    document.body.classList.add('js-loaded');

    initializeSmoothScrolling();
    initializeScrollReveal();
}

document.addEventListener('DOMContentLoaded', main);

/**
 * Implements smooth, consistent scrolling for all internal anchor links.
 * This enhances the single-page navigation experience.
 */
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate the position to scroll to. This can be adjusted for sticky headers.
                const headerOffset = 20; // Provides a little space from the top edge
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Sets up the IntersectionObserver to handle the subtle scroll-reveal animations.
 * It's designed to be performant by unobserving elements once they've been revealed.
 */
function initializeScrollReveal() {
    // Create a single observer to watch all revealable elements.
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport, animate it.
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Stop observing the element to save resources.
                observer.unobserve(entry.target);
            }
        });
    }, SCROLL_REVEAL_CONFIG);

    // Find all elements that should be animated on scroll.
    // The query targets elements with directional classes and parent portfolio items for potential stagger effects.
    const elementsToReveal = document.querySelectorAll('.reveal-left, .reveal-right, .portfolio-item');
    
    // Start observing each element.
    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });
}

