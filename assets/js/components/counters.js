function animateCounter(el, target, duration) {
    let start = 0;
    let startTime = null;
    const isDecimal = String(target).includes('.');

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        el.textContent = isDecimal
            ? current.toFixed(0)
            : (Math.floor(current) + (progress < 1 ? '' : el.dataset.suffix || ''));

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = el.dataset.final || el.textContent;
        }
    }

    requestAnimationFrame(step);
}

export function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, observerRef) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.count);
                animateCounter(el, target, 1200);
                observerRef.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach((el) => observer.observe(el));
}
