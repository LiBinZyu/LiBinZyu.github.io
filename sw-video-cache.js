// Service Worker for aggressive video caching
const CACHE_NAME = 'video-cache-v1';
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov'];

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

// Helper: check if request is for a video file
function isVideoRequest(request) {
  const url = request.url;
  return VIDEO_EXTENSIONS.some(ext => url.includes(ext));
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || !isVideoRequest(request)) return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async cache => {
      // Try cache first
      const cached = await cache.match(request);
      if (cached) return cached;

      // Fetch from network and cache
      try {
        const response = await fetch(request);
        // Only cache successful responses
        if (response.ok) {
          cache.put(request, response.clone());
        }
        return response;
      } catch (err) {
        // If offline and cache miss, fail
        return new Response('Network error', { status: 408 });
      }
    })
  );
});
