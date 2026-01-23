// Basic service worker for PWA
self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
});

self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', (event) => {
  // Cache strategy can be implemented here
  event.respondWith(fetch(event.request));
});