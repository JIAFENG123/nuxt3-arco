import lodash from 'lodash'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      ...lodash,
    },
  }
})
