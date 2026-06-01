const CACHE_NAME = 'project-create-v2';
const PRECACHE_ASSETS = [
    './',
    './index.html',
    './favicon.png',
    './assets/css/styles.css',
    './assets/css/mobile.css',
    './assets/js/main.js',
    './assets/js/components/mobileMenu.js',
    './assets/js/components/mobileDock.js',
    './assets/js/components/mobileSwipe.js',
    './assets/js/components/theme.js',
    './assets/js/components/animations.js',
    './assets/js/components/counters.js',
    './assets/js/components/hero.js',
    './assets/js/components/lightbox.js',
    './assets/js/components/navigation.js',
    './assets/js/components/scrollProgress.js',
    './images/logo.webp'
];

// ── 1. Install Event: Pre-cache Core Assets ──
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Pre-caching critical assets...');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// ── 2. Activate Event: Cleanup Old Caches ──
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[Service Worker] Cleaning old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// ── 3. Fetch Event: Hybrid Caching Strategy ──
self.addEventListener('fetch', (event) => {
    const request = event.request;
    const url = new URL(request.url);

    // Only handle local same-origin requests (exclude CDNs like FontAwesome/Tailwind initially unless dynamically caching)
    if (url.origin !== self.location.origin) {
        // For external resources (CDNs), use Network-First and dynamically cache
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (!response || response.status !== 200) return response;
                    const responseCopy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseCopy);
                    });
                    return response;
                })
                .catch(() => caches.match(request))
        );
        return;
    }

    // A. Network-First for HTML/Routes (Ensures users get instant text updates if online)
    if (request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const responseCopy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseCopy);
                    });
                    return response;
                })
                .catch(() => caches.match(request) || caches.match('./index.html'))
        );
        return;
    }

    // B. Cache-First for static assets (CSS, JS, Fonts, Images)
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If not in cache, fetch from network and cache dynamically
                return fetch(request).then((networkResponse) => {
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }

                    const responseCopy = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseCopy);
                    });
                    return networkResponse;
                });
            })
            .catch(() => {
                // If offline and request is an image, we could serve a placeholder
                if (request.url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/)) {
                    return caches.match('./images/logo.webp');
                }
            })
    );
});
