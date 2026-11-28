
const CACHE_NAME = "oor-site-v4";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./oor.html",
    "./one.css",
    "./songs.js",
    "./search.js",
    "./favorite.js",
    "./album.js",
    "./dvd-list.css",
    "./am.css",
    "./jin.css",
    "./777.css",
    "./zan.css",
    "./kan.css",
    "./eye.css",
    "./35.css",
    "./de.css",
    "./lu.css",
    "./beam.css",
    "./karasu.css",
    "./keturaku.css",
    "./make.css",
    "./notes.css",
    "./sky.css",
    "./un.css"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;

    const url = new URL(event.request.url);

    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                if (response.ok) {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, copy);
                    });
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
