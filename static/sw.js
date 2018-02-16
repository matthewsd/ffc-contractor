importScripts('/_nuxt/workbox.476439e0.js')

const workboxSW = new self.WorkboxSW({
  "cacheId": "user-front",
  "clientsClaim": true,
  "directoryIndex": "/"
})

workboxSW.precache([
  {
    "url": "/_nuxt/app.25cfc34765cc2c0fb7e3c4537a8aa042.css",
    "revision": "25cfc34765cc2c0fb7e3c4537a8aa042"
  },
  {
    "url": "/_nuxt/app.75783196bb63e2878aed.js",
    "revision": "a9a5c41ff614a9a8157c9125cfe8a050"
  },
  {
    "url": "/_nuxt/layouts/default.9f209f5a323d4af3113b.js",
    "revision": "cc75db532c801dc55ef4460fa1c5b18b"
  },
  {
    "url": "/_nuxt/manifest.61f7f850cd2c057aaa02.js",
    "revision": "c853a6fdf67b4253323cea5e5ac804ec"
  },
  {
    "url": "/_nuxt/pages/help.96065675bbf794a98c67.js",
    "revision": "b83e4279de4fe74705a04ed6fa8b2b71"
  },
  {
    "url": "/_nuxt/pages/index.9ed53e37c868e2292b0d.js",
    "revision": "183c85a6277c1de2cf5ae42fb0a477a2"
  },
  {
    "url": "/_nuxt/pages/inspire.c8bccd78f2c1ad88a064.js",
    "revision": "46d7873086138ffae9ebda77aa65c4bb"
  },
  {
    "url": "/_nuxt/pages/login.eb899430064bb338a6df.js",
    "revision": "8fbe0dc24b47d17f978c48f0d0b4a9d0"
  },
  {
    "url": "/_nuxt/pages/logout.bf1ed239bfd0cd6d2b52.js",
    "revision": "ac844f7c43195ee8b1a421afded23247"
  },
  {
    "url": "/_nuxt/pages/pqq/_id.9c760ed3ed6b79219a21.js",
    "revision": "c44499743480df99e0a7c024916909aa"
  },
  {
    "url": "/_nuxt/pages/profile.3447a7c1b0009b771038.js",
    "revision": "2dbeec26e886bcfc04c0ae263e63280a"
  },
  {
    "url": "/_nuxt/pages/standard.b868d6e7b693cc977e2c.js",
    "revision": "f89d21e1d72df48a7e9c65efce68f828"
  },
  {
    "url": "/_nuxt/vendor.dbcb666af362df77d972.js",
    "revision": "629163271b0d498e0459bf2ee7c36530"
  }
])


workboxSW.router.registerRoute(new RegExp('/_nuxt/.*'), workboxSW.strategies.cacheFirst({}), 'GET')

workboxSW.router.registerRoute(new RegExp('/.*'), workboxSW.strategies.networkFirst({}), 'GET')

