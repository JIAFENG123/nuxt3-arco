import type { Router } from 'vue-router'
import NProgress from 'nprogress' // progress bar

import { LOGIN, NOT_FOUND } from '../constants'
import { DEFAULT_ROUTE_NAME, appRoutes } from '../routes'
import { usePermissionStore, useUserStore } from '@/store'
import router from '@/router'
// import { handelRoute } from '@/utils/index'
// import { isLogin } from '@/utils/auth'
import usePermission from '@/hooks/permission'
import { getTokenPower } from '@/utils/cookies'

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

export default function setupUserLoginInfoGuard(routers: Router) {
  routers.beforeEach(async (to, from, next) => {
    NProgress.start()
    const userStore = useUserStore()
    const Permission = usePermission()
    const permissionStore = usePermissionStore()
    // 判断用户是否登陆

    const handelRoute = async function (routesArr: any) {
      return new Promise((resolve, reject) => {
        routesArr.forEach((element: any) => {
          router.addRoute(element)
        })
        resolve(router)
      })
    }
    if (sessionStorage.getItem('urlInfo')) {
      if (!userStore.name) {
        // 请求用户信息
        await userStore.GetUserInfo()
        await permissionStore.GenerateRoutes(userStore.systemCode)
        await handelRoute(permissionStore.routes)
        const mixinRoutes = [
          ...router.options.routes,
          ...appRoutes,
          ...permissionStore.routes,
        ]
        const name = to.path.substring(1, to.path.length)
        if (name && hasRoute(name, mixinRoutes))
          next({ ...to, replace: true })
        else
          next(NOT_FOUND)
      }
      else {
        if (to.name === 'login')
          next(DEFAULT_ROUTE_NAME)
        else
          next()
      }
      NProgress.done()
    }
    else if (typeof window !== 'undefined' && window.location.href.includes('?code=')) {
      await userStore.LoginByUsername()
      await userStore.GetUserInfo()
      await permissionStore.GenerateRoutes(userStore.systemCode)
      await handelRoute(permissionStore.routes)
      const destination
        = Permission.findFirstPermissionPermissionRoute(permissionStore.routes)
        || NOT_FOUND
      next(destination)
      NProgress.done()
    }
    else {
      const token = getTokenPower()
      if (token) {
        sessionStorage.setItem('urlInfo', token)
        next({ ...to, replace: true })
      }
      else {
        if (to.name === 'login') {
          next()
          NProgress.done()
        }
        else {
          next(LOGIN)
        }
      }
    }
  })
}
