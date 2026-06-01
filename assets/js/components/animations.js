export function initFadeIn() {
    const elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerRef.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('visible');
        } else {
            observer.observe(el);
        }
    });
}

export function initStatCards() {
    const cards = document.querySelectorAll('.stat-card');
    if (!cards.length) return;

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observerRef.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    cards.forEach((card) => observer.observe(card));
}
