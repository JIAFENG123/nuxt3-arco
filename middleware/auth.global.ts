import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import { LOGIN, NOT_FOUND } from '~/router/constants'
import { usePermissionStore, useUserStore } from '@/store'

import usePermission from '@/hooks/permission'
import { getTokenPower } from '@/utils/cookies'
import { DEFAULT_ROUTE_NAME, appRoutes } from '~~/router/routes'

function hasRoute(name: any, routeList: any[]): any {
  for (let i = 0; i < routeList.length; i++) {
    if (routeList[i].name === name)
      return true

    if (routeList[i].children) {
      const flag = hasRoute(name, routeList[i].children)
      if (flag)
        return flag
    }
  }
  return false
}
export default defineNuxtRouteMiddleware(async (to) => {
  // 只在客户端执行
  // Only execute on the client

  if (process.client) {
    NProgress.start()
    console.log('\n\n🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰')
    const style = 'background-color: white; color: black; font-style: italic; font-weight:700; border-bottom: 5px solid orange; font-size: 1.5em; padding:0.2em;'
    console.log('%cSFC NUXT3', style)
    console.log('🐰🐰🐰🐰🐰🐰🐰🐰🐰🐰\n\n')

    setRouteEmitter(to)
    const userStore = useUserStore()
    const Permission = usePermission()
    const permissionStore = usePermissionStore()
    // 判断用户是否登陆
    if (sessionStorage.getItem('urlInfo')) {
      if (!userStore.name) {
        // 请求用户信息
        await userStore.GetUserInfo()
        await permissionStore.GenerateRoutes(userStore.systemCode)
        const mixinRoutes = [
          ...appRoutes,
          ...permissionStore.routes,
        ]
        const name = to.name
        if (!(name && hasRoute(name, mixinRoutes)))
          return navigateTo(DEFAULT_ROUTE_NAME)
      }
      else {
        if (to.name === 'login')
          return navigateTo(DEFAULT_ROUTE_NAME)
      }
      NProgress.done()
    }
    else if (typeof window !== 'undefined' && window.location.href.includes('?code=')) {
      await userStore.LoginByUsername()
      await userStore.GetUserInfo()
      await permissionStore.GenerateRoutes(userStore.systemCode)
      const destination
        = Permission.findFirstPermissionPermissionRoute(permissionStore.routes)
        || NOT_FOUND
      return navigateTo(destination)
    }
    else {
      const token = getTokenPower()
      if (token) {
        sessionStorage.setItem('urlInfo', token)
        return navigateTo({ ...to, replace: true })
      }
      else {
        if (to.name === 'login')
          NProgress.done()

        else
          return navigateTo(LOGIN)
      }
    }
  }
})
