export function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!menuBtn || !menu) return;

    menuBtn.addEventListener('click', () => {
        const isOpen = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!isOpen));
    });

    menu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });
}
