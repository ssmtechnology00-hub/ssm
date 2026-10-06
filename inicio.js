// =========================================
// BANNER (carrusel principal)
// =========================================
(function () {
    const banner = document.querySelector('.banner');
    if (!banner) return;

    const slides = Array.from(banner.querySelectorAll('.slide'));
    const dots = Array.from(banner.querySelectorAll('.banner-dots button'));
    const SLIDE_TIME = 6000;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    banner.style.setProperty('--slide-time', SLIDE_TIME + 'ms');

    let current = 0;
    let timer = null;

    function show(i) {
        current = (i + slides.length) % slides.length;

        slides.forEach((s, n) => s.classList.toggle('is-active', n === current));

        // Reinicia la barra de progreso del punto activo
        dots.forEach((d, n) => {
            d.classList.remove('is-active');
            if (n === current) {
                void d.offsetWidth;
                d.classList.add('is-active');
            }
        });

        // Carga la imagen de la siguiente diapositiva por si aún no estaba
        const next = slides[(current + 1) % slides.length].querySelector('img');
        if (next) next.loading = 'eager';
    }

    function start() {
        if (reduceMotion) return;
        stop();
        timer = setTimeout(() => { show(current + 1); start(); }, SLIDE_TIME);
    }

    function stop() {
        clearTimeout(timer);
    }

    banner.querySelector('.prev').addEventListener('click', () => { show(current - 1); start(); });
    banner.querySelector('.next').addEventListener('click', () => { show(current + 1); start(); });
    dots.forEach((d, n) => d.addEventListener('click', () => { show(n); start(); }));

    // Pausa mientras el cursor o el teclado están sobre el banner
    banner.addEventListener('mouseenter', () => { banner.classList.add('is-paused'); stop(); });
    banner.addEventListener('mouseleave', () => { banner.classList.remove('is-paused'); show(current); start(); });
    banner.addEventListener('focusin', () => { banner.classList.add('is-paused'); stop(); });
    banner.addEventListener('focusout', () => { banner.classList.remove('is-paused'); show(current); start(); });

    // Deslizar con el dedo en celular
    let startX = 0;
    banner.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    banner.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - startX;
        if (Math.abs(dx) > 50) { show(current + (dx < 0 ? 1 : -1)); start(); }
    });

    // No gasta recursos si la pestaña está en segundo plano
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stop(); else { show(current); start(); }
    });

    show(0);
    start();
})();


// =========================================
// FILA DE DESTACADOS (flechas)
// =========================================
(function () {
    const rail = document.getElementById('rail');
    if (!rail) return;

    const prev = document.querySelector('.rail-btn[data-dir="-1"]');
    const next = document.querySelector('.rail-btn[data-dir="1"]');

    function step() {
        const card = rail.querySelector('.product-card');
        return card ? card.getBoundingClientRect().width + 20 : 300;
    }

    function update() {
        if (!prev || !next) return;
        prev.disabled = rail.scrollLeft <= 4;
        next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 4;
    }

    [prev, next].forEach(btn => {
        if (!btn) return;
        btn.addEventListener('click', () => {
            rail.scrollBy({ left: Number(btn.dataset.dir) * step() * 2, behavior: 'smooth' });
        });
    });

    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
})();
