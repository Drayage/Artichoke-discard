const CACHE_NAME = "artichoke-discard-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./game.js",
  "./pwa.js",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/apple-touch-icon.png",
  "./assets/cards/artichoke.png",
  "./assets/cards/eggplant.png",
  "./assets/cards/potato.png",
  "./assets/cards/carrot.png",
  "./assets/cards/leek.png",
  "./assets/cards/broccoli.png",
  "./assets/cards/beet.png",
  "./assets/cards/peas.png",
  "./assets/cards/onion.png",
  "./assets/cards/corn.png",
  "./assets/cards/pepper.png",
  "./assets/cards/rhubarb.png",
  "./assets/cards/wild/tomato.png",
  "./assets/cards/wild/cabbage.png",
  "./assets/cards/wild/turnip.png",
  "./assets/cards/wild/garlic.png",
  "./assets/cards/wild/mushroom.png",
  "./assets/cards/wild/cauliflower.png",
  "./assets/cards/wild/pumpkin.png",
  "./assets/cards/wild/bean-sprouts.png",
  "./assets/cards/wild/asparagus.png",
  "./assets/cards/wild/sweet-potato.png",
  "./assets/cards/wild/wasabi.png",
  "./assets/cards/wild/cucumber.png",
  "./assets/cards/wild/brussels-sprout.png",
  "./assets/cards/wild/celery.png",
  "./assets/cards/wild/parsley.png",
  "./assets/cards/wild/chicory.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((names) => Promise.all(
      names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
    ))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      });
    })
  );
});
