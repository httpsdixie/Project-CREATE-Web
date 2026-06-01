/**
 * Fullscreen Mobile Menu Component
 * Refactored to manage the modern glassmorphic overlay,
 * ensuring body-scroll locking and proper touch-feedback targets.
 */

export function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-overlay');
    const closeBtn = document.getElementById('overlay-close-btn');
    if (!menuBtn || !overlay) return;

    function openMenu() {
        overlay.classList.add('active');
        document.body.classList.add('mobile-menu-active');
        menuBtn.setAttribute('aria-expanded', 'true');
    }

    function closeMenu() {
        overlay.classList.remove('active');
        document.body.classList.remove('mobile-menu-active');
        menuBtn.setAttribute('aria-expanded', 'false');
    }

    // Toggle menu open
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openMenu();
    });

    // Close menu on close button tap
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Close menu when clicking any link inside the fullscreen navigation
    overlay.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close menu when clicking the overlay backdrop itself (if tapped outside links/actions)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeMenu();
        }
    });

    // Support escape key closing for accessibility
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeMenu();
        }
    });
}
