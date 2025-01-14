const cacheName = 'sw-proxy-v1';

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const keyList = await caches.keys();
  const cachesToDelete = keyList.map((key) => {
    if (cacheName !== key) {
      return deleteCache(key);
    }
  });
  await Promise.all(cachesToDelete);
};

const fetchAlgorithm = async (event) => {
  try {
    const response = await fetch(event.request);
    const responseClone = response.clone();
    const cache = await caches.open(cacheName);

    await cache.put(event.request, responseClone);

    return response;
  } catch (e) {
    return caches.match(event.request);
  }
};

self.addEventListener('install', (event) => {
  console.log('Proxy installed');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetchAlgorithm(event));
});
