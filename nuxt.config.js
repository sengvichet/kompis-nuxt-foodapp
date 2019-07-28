const pkg = require('./package')

module.exports = {
  mode: 'spa',
  head: {
    title: 'Kompis App',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0'
      },

      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },

  /*
   ** Customize the progress-bar color
   */

  loading: {
    color: 'white',
    height: '5px'
  },

  /*
   ** Global CSS
   */
  /*
    css: [
      '~assets/css/landing.css',
      '~assets/css/app.css'
    ],

  */
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/amplify',
    '~/plugins/mixpanel',
    {
      src: '~/plugins/bugsnag',
      ssr: false
    },
    '~/plugins/vee-validate',
    '~/plugins/vue-awesome',
    '~/plugins/vue-debounce',
    '~/plugins/vue2-notify',
    '~/plugins/kompis/functions',
    '~/plugins/kompis/locations',
    '~/plugins/kompis/devices',
    '~/plugins/kompis/shops',
    '~/plugins/kompis/categories',
    '~/plugins/kompis/videos',
    '~/plugins/kompis/delivery-points',
    '~/plugins/kompis/products',
    '~/plugins/kompis/users'
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-rfg-icon',
    '@nuxtjs/axios',
    ['nuxt-i18n', {
      locales: [{
          code: 'en',
          file: 'en-US.js'
        },
        {
          code: 'no',
          file: 'no-NO.js'
        }
      ],
      lazy: true,
      langDir: 'lang/',
      defaultLocale: 'no',
      seo: false,
      detectBrowserLanguage: false

    }]
  ],

  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  env: {
    stage: 'prod', // set 'prod' for production, 'dev' for development
    cdn: {
      URL: 'https://cdn.kompis.app/public/'
    },
    s3: {
      REGION: "eu-central-1",
      BUCKET: "kompis-app-uploads"
    },
    apiGateway: {
      REGION: "eu-central-1",
      PROD_URL: "https://api.kompis.app",
      DEV_URL: "https://devapi.kompis.app"
    },
    cognito: {
      PROD_USER_POOL_ID: "eu-central-1_E1nLfop0C",
      PROD_APP_CLIENT_ID: "7ddj4d97lb470a08e88skqs5h9",
      PROD_REGION: 'eu-central-1',
      PROD_IDENTITY_POOL_ID: "eu-central-1:141ab8a7-0c79-4ff9-97de-f00d98b63951",
      DEV_USER_POOL_ID: "eu-central-1_o36r1nMGj",
      DEV_APP_CLIENT_ID: "2mrcjrkfm6lpbche4vo3j45psj",
      DEV_REGION: 'eu-central-1',
      DEV_IDENTITY_POOL_ID: "eu-central-1:19c56d86-9419-4f33-93ac-18de6803d4a4"
    },
    mixpanel: {
      DEV_API_KEY: 'fd0c1160fb6a9b9d145277adf0d934ae',
      PROD_API_KEY: 'b3607e571d4107489c548f4a69495326',
    },
    bugsnag: {
      API_KEY: 'fd490dc0489374329842ddd3b0b568d7'
    }

  },

  /*
   ** Build configuration
   */
  build: {

    vendor: [
      'aws-amplify',
      'mixpanel-browser',
      //  'chart.js',
      //  'vue-chartjs'
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      /*
      var CopyWebpackPlugin = require('copy-webpack-plugin')
      plugins: [
        new CopyWebpackPlugin([{
          from: 'node_modules/amcharts3/amcharts/images',
          to: 'amcharts/images'
        }, ])
      ]
      */
    }
  }
}