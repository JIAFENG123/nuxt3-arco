import lodash from 'lodash'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(lodash)
})
