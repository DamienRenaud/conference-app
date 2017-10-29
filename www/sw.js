importScripts("https://cdn.rawgit.com/mozilla/localForage/master/dist/localforage.js");

const STATIC_CACHE_NAME = 'devfest-cache';

self.addEventListener('install', event => {
    console.log('Installation du Service Worker...');
    console.log('Mise en cache des ressources');
    event.waitUntil(
        Promise.all([
            fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/speakers.json')
                .then(resp => resp.json())
                .then(speakers => {
                    let store = localforage.createInstance({ name: 'speakers' })
                    for (key in speakers) {
                        store.setItem(key, speakers[key])
                    }
                }),
            fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/sessions.json')
                .then(resp => resp.json())
                .then(sessions => {
                    let store = localforage.createInstance({ name: 'sessions' })
                    for (key in sessions) {
                        store.setItem(key, sessions[key])
                    }
                }),
                fetch('https://raw.githubusercontent.com/DevInstitut/conference-data/master/schedule.json')
                .then(resp => resp.json())
                .then(schedule => {
                    let store = localforage.createInstance({ name: 'schedule' })
                    for (key in schedule) {
                        store.setItem(key, schedule[key])
                    }
                })
        ])
    );
});

self.addEventListener('activate', event => {
    console.log('Activating new service worker...');
    const cacheWhitelist = [STATIC_CACHE_NAME];
    // suppression des caches excepté le cache courant (STATIC_CACHE_NAME) 
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) < 0) {
                        return caches.delete(cacheName);
                    }
                }));
        }));
});

// active immédiatement un nouveau service worker 
self.skipWaiting();

self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(event.request.url, 'servi depuis le cache');
                return response;
            }
            console.log(event.request.url, 'servi depuis le réseau'); return fetch(event.request)
        })
            // rubrique à ajouter 
            .then(function (response) {
                return caches.open(STATIC_CACHE_NAME).then(cache => {
                    // mise en cache des ressources qui ne contiennent pas no.cache
                    if (event.request.url.indexOf('no.cache') < 0 
                        && event.request.url.indexOf('chrome-extension') < 0 
                        && event.request.url.indexOf('templates/') < 0 
                        && event.request.url.indexOf('js/') < 0
                        && event.request.url.indexOf('devfest.gdgnantes.com') < 0) {
                        cache.put(event.request.url, response.clone());
                    }
                    return response;
                });
            })
            .catch(error => {
                console.log("oops");
            })
    );
});
