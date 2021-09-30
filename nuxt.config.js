export default {

  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  // mode: 'spa', 
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Estetify App',
    htmlAttrs: {
      lang: 'pt-br',
      class: 'full-height'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-the-mask',
    '~/plugins/repositories',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    ['nuxt-fontawesome', {
      component: 'fa', //customize component name
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: ['fas']
        },
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: ['far']
        },
        
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: ['fab']
        },
      ]
   }]
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['nuxt-buefy', { css: false, materialDesignIcons: true }],
  ],
  axios: {
    baseURL: process.env.API_BASE_URL+"/v1/",
    https: false,
    credentials: true,
  },
  auth: {
    // Options
    strategies: {
      laravelSanctum: {
        provider: 'laravel/sanctum',
        url: process.env.API_BASE_URL,
        token: {
          property: 'token',
          global: true,
          type: 'Bearer',
          required: true,
        },
        endpoints:{
          login: {
            url: '/login',
            propertyName: 'token'
          },
          logout: {
            url: '/logout'
          },
          user: { url: '/user/profile', method: 'get' }
        },

      },

    },
  },
  router: {
    middleware: ['auth']
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
