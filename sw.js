const CACHE_NAME = 'munjaz-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/logo-white.png',
  './assets/icon-48.png',
  './assets/icon-96.png',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/icon-180.png',
  'https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request))
  );
});
