import 'regenerator-runtime';
import CacheHelper from './utils/cache-helper';

// Caching the listed asset below
const assetsToCache = [
  './',
  './images/icons/icon-48-48.png',
  '.images/icons/icon-72-72.png',
  '.images/icons/icon-96-96.png',
  '.images/icons/icon-144-144.png',
  '.images/icons/icon-192-192.png',
  '.images/icons/icon-512-512.png',
  './index.html',
  './icon.png',
  './app.bundle.js',
  './app.webmanifest',
  './sw.bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
