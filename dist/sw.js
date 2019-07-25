importScripts('/js-vfx/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/js-vfx/_nuxt/49e889a464c4c3e7890a.js",
    "revision": "51945a888994a575118ac4f39b6b2ceb"
  },
  {
    "url": "/js-vfx/_nuxt/6dc4e05978eb8a941f91.js",
    "revision": "556d707199505455a6d79be7d0ecf533"
  },
  {
    "url": "/js-vfx/_nuxt/ad203cd673804c5d77ac.js",
    "revision": "90e0f54a523212c5c777206e98f95f71"
  },
  {
    "url": "/js-vfx/_nuxt/bd46bec5739b97e51412.js",
    "revision": "aac6f8f5b5a5d026b735f05f069739ee"
  },
  {
    "url": "/js-vfx/_nuxt/e03e0674231c6abc7b30.js",
    "revision": "14aba0cf68ab6b61a20259d5113c4f30"
  },
  {
    "url": "/js-vfx/_nuxt/f5b8f33d9f3a9edc9994.js",
    "revision": "3b3f4139133b8e95b803520dc750a32d"
  }
], {
  "cacheId": "js-vfx",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/js-vfx/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/js-vfx/.*'), workbox.strategies.networkFirst({}), 'GET')