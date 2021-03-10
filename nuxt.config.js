import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Yahia Network',
    title: 'Yahia Network',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss',
    '@mdi/font/css/materialdesignicons.css',
    'roboto-fontface/css/roboto/roboto-fontface.css',
    'typeface-cairo',
    'typeface-poppins',
    'vue-custom-scrollbar/dist/vueScrollbar.css',
  ],

  loading: {
    color: '#1976d2',
    failedColor: 'red',
    height: '8px',
    continuous: true,
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-the-mask.js',
    '~plugins/vue-custom-scrollbar.js',
    '~plugins/mixins.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '~/components',
      {
        path: '~/components/landing/',
        prefix: 'landing',
      },
      {
        path: '~/components/vc/',
        prefix: 'vc',
      },
      {
        path: '~/components/signin/',
        prefix: 'signin',
      },
    ],
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    [
      '@nuxtjs/eslint-module',
      {
        cache: false,
      },
    ],
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://auth.nuxtjs.org/guide/setup
    // '@nuxtjs/auth-next',
    // https://firebase.nuxtjs.org/guide/
    '@nuxtjs/firebase',
  ],

  eslint: {
    cache: false,
  },

  firebase: {
    onFirebaseHosting: true,
    config: {
      databaseURL: 'https://y--network.firebaseio.com',
      apiKey: 'AIzaSyC46nDUmRkjFwHeulUdpmuKH01Lv-IA4wQ',
      authDomain: 'y--network.firebaseapp.com',
      projectId: 'y--network',
      storageBucket: 'y--network.appspot.com',
      messagingSenderId: '820507626739',
      appId: '1:820507626739:web:f484778b93d58d556f7b86',
      measurementId: 'G-YFHTKCMHRY',
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
          onAuthStateChangedAction: 'onAuthStateChangedAction',
          subscribeManually: false,
        },
        ssr: false, // default
        // emulatorPort: 9099,
        // emulatorHost: 'http://localhost',
      },
      firestore: true,
      functions: true,
      storage: true,
      // database: true,
      // messaging: true,
      // performance: true,
      // analytics: true,
      // remoteConfig: true,
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    workbox: {
      // importScripts: ['/firebase-auth-sw.js'],
      // swURL: '/sw.js',
      // dev: process.env.NODE_ENV === 'development',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    rtl: false,
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    icons: {
      iconfont: 'mdiSvg', // mdi
    },
    theme: {
      options: {
        customProperties: true,
      },
      dark: false,
      themes: {
        light: {
          light: '#f7faff',
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  serverMiddleware: [
    {
      path: '/nuxtfiles',
      handler: '~/servermiddleware/assets.js',
    },
  ],

  // Router options
  router: {
    mode: 'hash',
    middleware: [
      // 'auth',
      // 'router-auth',
    ],
  },
}
