const CACHE_KEY = 'sw-proxy-v1';
const TIMEOUT = 1000;
const CACHE_MAX_AGE = 43200;

class CacheSw {
  #cacheKey;

  constructor(cacheName) {
    this.#cacheKey = cacheName;
  }

  async get(request) {
    return await caches.match(request);
  }

  async add(request) {
    const cache = await caches.open(this.#cacheKey);

    await cache.add(request);
  }

  async put(request, response) {
    const cache = await caches.open(this.#cacheKey);

    await cache.put(request, response);
  }

  async delete(key) {
    await caches.delete(key);
  }

  async clear() {
    const keyList = await caches.keys();
    const cachesToDelete = keyList.map((key) => {
      if (key !== this.#cacheKey) {
        return this.delete(key);
      }
    });
    await Promise.all(cachesToDelete);
  }

  isValid(response) {
    if (!response) return false;

    const date = response.headers.get('date-fetched-on');

    return !!(date && new Date().getTime() - parseFloat(date) < CACHE_MAX_AGE);
  }
}

const cache = new CacheSw(CACHE_KEY);

const activate = async () => {
  await cache.clear();
};

const fetchAlgorithm = async (event) => {
  const responseFromCache = await cache.get(event.request);

  if (cache.isValid(responseFromCache)) {
    return responseFromCache;
  }

  let timeoutId;

  try {
    timeoutId = setTimeout(() => {
      throw new Error('Timeout has expired');
    }, TIMEOUT);

    const response = await fetch(event.request);
    const responseClone = response.clone();
    const { body, ...rest } = responseClone;

    const headers = new Headers([...responseClone.headers.entries()]);
    headers.set('date-fetched-on', new Date().toUTCString());

    cache.put(
      event.request,
      new Response(body, {
        ...rest,
        headers,
      })
    );

    return response;
  } catch (e) {
    return (
      responseFromCache ||
      new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      })
    );
  } finally {
    clearTimeout(timeoutId);
  }
};

self.addEventListener('install', (event) => {
  console.log('Proxy installed');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(activate());
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(fetchAlgorithm(event));
});
