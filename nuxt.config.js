export default {
  target: 'static',
  /*
   ** Headers of the page
   */
  devtools: true,
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://use.typekit.net/egg1tbq.css' },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.2.0/css/all.css',
        integrity:
          'sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href:
          'https://cdn.jsdelivr.net/npm/@mdi/font@5.9.55/css/materialdesignicons.min.css'
      }
    ]
  },
  /*
   ** Router Config
   */
  router: {
    middleware: ['status-redirect']
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/disco'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    // Doc: https://axios.nuxtjs.org/usage
    'nuxt-svg-loader',
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  },
  content: {
    dir: 'content'
  },
  buildDir: '.nuxt',
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    hotMiddleware: {
      client: {
        // turn off client overlay when errors are present
        overlay: false
      }
    },
    extend(config, { isDev, isClient }) {
      config.resolve.alias.vue = 'vue/dist/vue.common';
    }
  },
  serverMiddleware: [
    { path: '/_ghapi', handler: '~/server-middleware/gh-api.js' }
  ]
};
