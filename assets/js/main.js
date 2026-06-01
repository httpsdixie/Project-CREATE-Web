import { initMobileMenu } from './components/mobileMenu.js';
import { initNavScroll, initActiveNav, initBackToTop } from './components/navigation.js';
import { initScrollProgress } from './components/scrollProgress.js';
import { initFadeIn, initStatCards } from './components/animations.js';
import { initCounters } from './components/counters.js';
import { initTypewriter, initSectionIndicator } from './components/hero.js';
import { initLightbox } from './components/lightbox.js';
import { initMobileDock } from './components/mobileDock.js';
import { initMobileSwipe } from './components/mobileSwipe.js';
import { initTheme } from './components/theme.js';

// Initialize theme immediately to prevent FOUC (Flash of Unstyled Content)
initTheme();

/* ── Init all ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
    initMobileMenu();
    initNavScroll();
    initActiveNav();
    initBackToTop();
    initScrollProgress();
    initFadeIn();
    initStatCards();
    initCounters();
    initTypewriter();
    initSectionIndicator();
    initLightbox();
    initMobileDock();
    initMobileSwipe();
});

// ── Register Service Worker for Offline Caching ──
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => {
                console.log('[Service Worker] Registered successfully with scope:', reg.scope);
            })
            .catch((err) => {
                console.error('[Service Worker] Registration failed:', err);
            });
    });
}
