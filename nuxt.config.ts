// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-30',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt'
  ],

  css: [
    '~/assets/scss/variables.scss',
  ]
})