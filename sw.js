const CACHE_NAME = "exodus-app-v2";

const urlsToCache = [
  "./",
  "./index.html"
];

// Instalação
self.addEventListener("install", event => {
  self.skipWaiting(); // força atualizar
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Ativação (limpa versões antigas)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // assume controle imediato
});

// Fetch (sempre busca novo primeiro)
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});