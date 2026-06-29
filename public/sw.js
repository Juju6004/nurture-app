// Minimal service worker for Nurture.
// - App-shell navigations: network-first, fall back to the last cached page
//   so the app still opens offline.
// - Other same-origin GETs (hashed JS/CSS, icons, fonts): stale-while-revalidate.
const CACHE = 'nurture-v1'

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys()
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  const sameOrigin = url.origin === self.location.origin

  // Navigations → network-first with cache fallback.
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request)
          const cache = await caches.open(CACHE)
          cache.put(request, fresh.clone())
          return fresh
        } catch {
          const cache = await caches.open(CACHE)
          return (await cache.match(request)) || (await cache.match('./')) || Response.error()
        }
      })(),
    )
    return
  }

  if (!sameOrigin) return

  // Static assets → stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE)
      const cached = await cache.match(request)
      const network = fetch(request)
        .then((res) => {
          if (res && res.status === 200) cache.put(request, res.clone())
          return res
        })
        .catch(() => cached)
      return cached || network
    })(),
  )
})
