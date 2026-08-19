/* The old mamma-mia-truck app has moved to /panatieris-on-wheels/.
   This worker exists only to unregister itself and clear the old shell, so a
   phone that still has the old app installed stops serving a cached copy of it
   and follows the redirect instead. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('mamma-mia-')).map((k) => caches.delete(k))))
      .then(() => self.registration.unregister())
      .then(() => self.clients.claim())
  );
});
