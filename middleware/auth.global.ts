import type { LocationQueryRaw } from 'vue-router'
import { useUserStore } from '~~/store'
export default defineNuxtRouteMiddleware(async (to) => {
  const userStore = useUserStore()
  console.log('to', to)

  if (isLogin()) {
    if (userStore.role) {
      return navigateTo(to)
    }
    else {
      try {
        await userStore.info()
        return navigateTo(to)
      }
      catch (error) {
        await userStore.logout()
        return navigateTo({
          name: 'login',
          query: {
            redirect: to.name,
            ...to.query,
          } as LocationQueryRaw,
        })
      }
    }
  }
  else {
    if (to.name === 'login') {
      console.log('===')
    }
    else {
      return navigateTo({
        path: '/login',
        query: {
          redirect: to.name,
          ...to.query,
        } as LocationQueryRaw,
      })
    }
  }
})
