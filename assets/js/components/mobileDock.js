/**
 * Bottom Floating Navigation Dock Component
 * Practices Single Responsibility and Defensive Design.
 */

export function initMobileDock() {
    const dock = document.getElementById('mobile-dock');
    if (!dock) return;

    // ── 1. Intelligent Show/Hide on Scroll (Throttled via requestAnimationFrame) ──
    let lastScrollY = window.scrollY;
    let ticking = false;
    const hideThreshold = 100; // Minimum scroll height before dock can hide

    function handleScroll() {
        const currentScrollY = window.scrollY;

        // If scrolling down and past threshold, hide the dock
        if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) {
            dock.classList.add('dock-hidden');
        } else {
            // Scrolling up, show the dock
            dock.classList.remove('dock-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }, { passive: true });


    // ── 2. Sync Active Navigation Item with Intersection Observer ──
    const sections = document.querySelectorAll('section[id]');
    const dockItems = {
        about:      document.getElementById('dock-about'),
        impact:     document.getElementById('dock-impact'),
        gallery:    document.getElementById('dock-gallery'),
        partners:   document.getElementById('dock-partners'),
        next:       document.getElementById('dock-next')
    };

    // Clean up elements that might not be found in DOM dynamically
    const activeDockItems = {};
    for (const key in dockItems) {
        if (dockItems[key]) {
            activeDockItems[key] = dockItems[key];
        }
    }

    const observerOptions = {
        rootMargin: '-35% 0px -45% 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all dock items
                Object.values(activeDockItems).forEach(item => {
                    item.classList.remove('dock-active');
                });

                // Add active class to corresponding item
                const targetItem = activeDockItems[sectionId];
                if (targetItem) {
                    targetItem.classList.add('dock-active');
                }
            }
        });
    }, observerOptions);

    sections.forEach((section) => {
        if (activeDockItems[section.id] !== undefined) {
            observer.observe(section);
        }
    });

    // Reset when at the very top of the page
    window.addEventListener('scroll', () => {
        if (window.scrollY < 120) {
            Object.values(activeDockItems).forEach(item => {
                item.classList.remove('dock-active');
            });
        }
    }, { passive: true });
}
