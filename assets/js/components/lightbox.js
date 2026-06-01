export function initLightbox() {
    const slots = document.querySelectorAll('.photo-slot img');
    if (!slots.length) return;

    const overlay = document.getElementById('lightbox');
    const img = document.getElementById('lightbox-img');
    const caption = document.getElementById('lightbox-caption');
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');
    const close = document.getElementById('lightbox-close');
    if (!overlay || !img || !caption || !prev || !next || !close) return;

    const images = Array.from(slots);
    let current = 0;

    function show(index) {
        current = (index + images.length) % images.length;
        img.src = images[current].src;
        img.alt = images[current].alt;
        caption.textContent = images[current].alt;
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hide() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    images.forEach((image, i) => {
        if (image.parentElement) {
            image.parentElement.style.cursor = 'pointer';
            image.parentElement.addEventListener('click', () => show(i));
        }
    });

    prev.addEventListener('click', (e) => {
        e.stopPropagation();
        show(current - 1);
    });

    next.addEventListener('click', (e) => {
        e.stopPropagation();
        show(current + 1);
    });

    close.addEventListener('click', hide);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) hide();
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
        if (e.key === 'Escape') hide();
    });

    let touchStartX = 0;
    overlay.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    overlay.addEventListener('touchend', (e) => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? show(current + 1) : show(current - 1);
        }
    }, { passive: true });
}
