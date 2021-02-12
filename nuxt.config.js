export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Mevron Admin Dashboard',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/assets/images/favicon.ico' },
    ],
    script: [
      {
        src: '/js/jquery.min.js',
      },
      {
        src: '/js/bootstrap.bundle.min.js',
      },
      {
        src: '/js/metismenu.min.js',
        defer: true,
      },
      {
        src: '/js/jquery.slimscroll.js',
        defer: true,
      },
      {
        src: '/js/app.js',
        defer: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'assets/css/bootstrap.min.css',
    'assets/css/metismenu.min.css',
    'assets/css/icons.css',
    'assets/css/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/axios', '@/plugins/persisted'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios'],

  axios: {
    baseURL: 'http://34.68.96.89/api/v2',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
