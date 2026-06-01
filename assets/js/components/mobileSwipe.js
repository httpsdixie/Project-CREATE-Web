/**
 * Mobile Swipe Carousels Component
 * Practices Single Responsibility and Modular Design.
 */

export function initMobileSwipe() {
    const containers = document.querySelectorAll('.mobile-swipe-snap');
    if (!containers.length) return;

    containers.forEach((container) => {
        const parent = container.closest('.swipe-container');
        if (!parent) return;

        let ticking = false;

        function updateFades() {
            const scrollLeft = container.scrollLeft;
            const maxScrollLeft = container.scrollWidth - container.clientWidth;

            // If user scrolled to the end, add reached-end class to parent to fade out the indicator
            if (scrollLeft >= maxScrollLeft - 15) {
                parent.classList.add('reached-end');
            } else {
                parent.classList.remove('reached-end');
            }
            
            ticking = false;
        }

        // Run initial check
        updateFades();

        // Attach throttled listener
        container.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(updateFades);
                ticking = true;
            }
        }, { passive: true });
    });
}
