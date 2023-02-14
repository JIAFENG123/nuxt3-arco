// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['nuxt-windicss', '@pinia/nuxt', '@vueuse/nuxt'],
  // 引入arco-design样式
  // css: ['@arco-design/web-vue/dist/arco.css'],
  vite: {
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
  },
})
