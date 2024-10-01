import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css',
    '@/assets/theme/custom-theme.css',
    'primeicons/primeicons.css',
  ],
  modules: ['@nuxtjs/supabase', "@nuxt/ui",  '@primevue/nuxt-module'],

  primevue: {
        options: {
            theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
        }
    },

  supabase: {
    redirect: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Track All - nuxt project'
    }
  },
})