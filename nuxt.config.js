export default {
  ssr: true,
  /*
   ** Headers of the page
   */
  components: true,
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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Router Config
   */
  router: {
    middleware: ['status-redirect']
  },
  /*
   ** Tell Nuxt to render these routes on the server side?
   */
  generate: {
    routes: [
      '/about/people',
      '/about/opportunities',
      '/services',
      '/our-work/workshops',
      '/test'
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/scss/_button',
    '@/assets/scss/_color',
    '@/assets/scss/_defaults',
    '@/assets/scss/_fonts',
    '@/assets/scss/_helpers',
    '@/assets/scss/_navbar',
    '@/assets/scss/_variables',
    '@/assets/scss/disco'
  ],
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
    '@nuxtjs/stylelint-module',
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        icons: {
          brands: true,
          solid: true
        },
        proIcons: {
          light: true,
          solid: true,
          regular: true,
          duotone: true
        }
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxt/content',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    'nuxt-svg-loader',
    '@nuxtjs/markdownit',
    // Or if you have custom options...
    ['vue-scrollto/nuxt', { duration: 800 }]
  ],
  markdownit: {
    injected: true
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'http://localhost:3001',
    headers: {
      common: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'localhost'
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    hotMiddleware: {
      client: {
        // turn off client overlay when errors are present
        overlay: false
      }
    },
    extend(config, { isDev, isClient }) {
      config.resolve.alias.vue = 'vue/dist/vue.common';
    }
  }
};
