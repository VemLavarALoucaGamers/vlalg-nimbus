import { resolve } from 'path'

export default defineNuxtConfig({
 // https://github.com/nuxt-themes/docus
 extends: '@nuxt-themes/docus',

  build: {
    extends: (config) => {
      config.resolve.symlinks = false
    }
  },

  modules: [
    // https://github.com/nuxt-modules/plausible
    '@nuxtjs/plausible',
    // https://github.com/nuxt/devtools
    '@nuxt/devtools',
    '@nuxtjs/eslint-module'
  ],

  css: ["@/assets/scss/global.scss"],

  alias: {
    '@': resolve(__dirname, './'),
    '@assets': resolve(__dirname, './assets')
  },

  docus: {
      title: 'Nimbus',
      header: {
        title: true,
        logo: false
      }
  },
  
  vite: {
    build: {
      target: 'esnext', // Necessário para Web Components em navegadores modernos
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('github-stars-button')
    }
  },

  compatibilityDate: '2024-11-19',
})
