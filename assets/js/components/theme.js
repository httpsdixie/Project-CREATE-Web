/**
 * Theme Controller Component (Dark Mode)
 * Practices Single Responsibility and Defensive Design.
 */

export function initTheme() {
    const htmlEl = document.documentElement;
    const storageKey = 'project-create-theme';

    // ── 1. Determine Initial Theme State ──
    function getInitialTheme() {
        const savedTheme = localStorage.getItem(storageKey);
        if (savedTheme) {
            return savedTheme;
        }
        // Fallback to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
    }

    const currentTheme = getInitialTheme();
    applyTheme(currentTheme);

    // ── 2. Apply Theme Class & Update UI Buttons ──
    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }
        localStorage.setItem(storageKey, theme);
        updateToggleIcons(theme);
    }

    // ── 3. Update Toggle Icons Dynamically ──
    function updateToggleIcons(theme) {
        const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
        toggleBtns.forEach((btn) => {
            const icon = btn.querySelector('i');
            if (!icon) return;

            if (theme === 'dark') {
                icon.className = 'fa-solid fa-sun text-xl text-yellow-400 transform rotate-0 transition-transform duration-300';
                btn.setAttribute('aria-label', 'Switch to light mode');
            } else {
                icon.className = 'fa-solid fa-moon text-xl text-amber-600 transform rotate-0 transition-transform duration-300';
                btn.setAttribute('aria-label', 'Switch to dark mode');
            }
        });
    }

    // ── 4. Toggle Logic ──
    function toggleTheme() {
        const isDark = htmlEl.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);

        // Add a subtle rotation transition effect to the icons on tap
        const activeIcons = document.querySelectorAll('.theme-toggle-btn i');
        activeIcons.forEach((icon) => {
            icon.classList.add('rotate-45');
            setTimeout(() => icon.classList.remove('rotate-45'), 250);
        });
    }

    // ── 5. Setup Listeners ──
    // Setup event listeners on DOM elements using event delegation or direct bindings
    function setupToggleListeners() {
        const toggleBtns = document.querySelectorAll('.theme-toggle-btn');
        toggleBtns.forEach((btn) => {
            // Remove existing listener if any to prevent double-firing
            btn.removeEventListener('click', toggleTheme);
            btn.addEventListener('click', toggleTheme);
        });
    }

    // Bind immediately and export setup helper for dynamically added buttons
    setupToggleListeners();

    // Observe body for changes or simply re-run binding on custom triggers
    const observer = new MutationObserver(() => {
        setupToggleListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });
}
