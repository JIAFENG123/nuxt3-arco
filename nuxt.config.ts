// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-windicss', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/color-mode'],
  css: ['~/assets/style/global.less'],
  vite: {
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "~/assets/style/breakpoint.less";',
        },
      },
    },
  },
})
