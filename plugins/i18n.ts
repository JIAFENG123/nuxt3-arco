import i18n from '~~/locale'

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(i18n)
})
