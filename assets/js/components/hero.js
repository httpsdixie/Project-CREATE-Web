export function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const phrases = [
        'Art, Tales, and Experiences.',
        'Reading. Creating. Growing.',
        'Empowering Young Minds.',
        'One Page at a Time.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function tick() {
        const current = phrases[phraseIndex];

        if (!isDeleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, 1800);
                return;
            }
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        setTimeout(tick, isDeleting ? 45 : 80);
    }

    setTimeout(tick, 1200);
}

export function initSectionIndicator() {
    const pill = document.getElementById('section-indicator');
    if (!pill) return;

    const sections = document.querySelectorAll('section[id]');
    const labels = {
        about: 'About',
        impact: 'Impact',
        gallery: 'Gallery',
        volunteers: 'Volunteers',
        partners: 'Partners',
        next: 'Next Edition'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const label = labels[entry.target.id];
                if (label) {
                    pill.textContent = label;
                    pill.classList.add('visible');
                }
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px' });

    window.addEventListener('scroll', () => {
        if (window.scrollY < 200) {
            pill.classList.remove('visible');
        }
    }, { passive: true });

    sections.forEach((section) => observer.observe(section));
}
