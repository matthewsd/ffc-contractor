require('dotenv').config()

module.exports = {
  middleware: ['auth'],
  serverMiddleware: [
    'redirect-ssl'
  ],
  /*
  ** Headers of the page
  */
  head: {
    title: 'FFC',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'First for Contractors - Contractor Management' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' },
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: [
    '~/assets/style/app.styl',
    '~/assets/style/vue2Dropzone.styl'
  ],
  modules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/auth'
  ],
  auth: {
    endpoints: {
      login: { url: '/login_check', method: 'post', propertyName: 'token' },
      logout: { url: '/logout', method: 'post' },
      user: { url: '/user_check', method: 'get', propertyName: 'user' }
    }
  },
  axios: {
    baseURL: process.env.APP_API_URL,
    browserBaseURL: process.env.APP_API_URL
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#BE3B00' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'babel-polyfill',
      '~/plugins/vuetify.js'
    ],
    extractCSS: true,
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
