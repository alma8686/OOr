const CACHE_NAME = "oor-site-v1";

const FILES_TO_CACHE = [
    "./",
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
    "./the_way_back.css",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(FILES_TO_CACHE);
        })
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
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});