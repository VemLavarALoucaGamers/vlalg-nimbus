import { resolve } from 'path'

export default defineNuxtConfig({
 // https://github.com/nuxt-themes/docus
 extends: '@nuxt-themes/docus',

  build: {
    transpile: ['@vlalg-nimbus/github-stars-button']
  },

  devtools: {
    enabled: false
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
    resolve: {
      alias: {
        '@': resolve(__dirname, './'),
        '@assets': resolve(__dirname, './assets')
      }
    },
    build: {
      target: 'esnext', // Necessário para Web Components em navegadores modernos
    },
    optimizeDeps: {
      include: ['@vlalg-nimbus/github-stars-button']
    }
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag.includes('github-stars-button')
    }
  },

  compatibilityDate: '2024-11-19',

  // StackBlitz WebContainers no iframe exigem isolamento no documento pai.
  // https://github.com/stackblitz/webcontainer-core/issues/2100
  routeRules: {
    '/**': {
      headers: {
        'Cross-Origin-Embedder-Policy': 'credentialless',
        'Cross-Origin-Opener-Policy': 'same-origin'
      }
    }
  }
})
