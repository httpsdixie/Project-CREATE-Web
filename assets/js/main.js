import { initMobileMenu } from './components/mobileMenu.js';
import { initNavScroll, initActiveNav, initBackToTop } from './components/navigation.js';
import { initScrollProgress } from './components/scrollProgress.js';
import { initFadeIn, initStatCards } from './components/animations.js';
import { initCounters } from './components/counters.js';
import { initTypewriter, initSectionIndicator } from './components/hero.js';
import { initLightbox } from './components/lightbox.js';

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
});
