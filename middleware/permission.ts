// progress bar
import type { RouteRecordNormalized } from 'vue-router'
import usePermission from '@/hooks/permission'
import { useAppStore, useUserStore } from '@/store'
import { NOT_FOUND, WHITE_LIST } from '~~/router/constants'
import { appRoutes } from '~~/router/routes'
export default defineNuxtRouteMiddleware(async (to) => {
  setRouteEmitter(to)
  const userStore = useUserStore()
  const appStore = useAppStore()
  const Permission = usePermission()
  const permissionsAllow = Permission.accessRouter(to)
  if (appStore.menuFromServer) {
    // 针对来自服务端的菜单配置进行处理
    // Handle routing configuration from the server

    // 根据需要自行完善来源于服务端的菜单配置的permission逻辑
    // Refine the permission logic from the server's menu configuration as needed
    if (
      !appStore.appAsyncMenus.length
        && !WHITE_LIST.find(el => el.name === to.name)
    )
      await appStore.fetchServerMenuConfig()

    const serverMenuConfig = [...appStore.appAsyncMenus, ...WHITE_LIST]

    let exist = false
    while (serverMenuConfig.length && !exist) {
      const element = serverMenuConfig.shift()
      if (element?.name === to.name)
        exist = true

      if (element?.children) {
        serverMenuConfig.push(
          ...(element.children as unknown as RouteRecordNormalized[]),
        )
      }
    }
    if (exist && permissionsAllow)
      return navigateTo(to)
    else return navigateTo(NOT_FOUND)
  }
  else {
    // eslint-disable-return navigateTo-line max-statements-per-line
    // eslint-disable-next-line max-statements-per-line
    if (permissionsAllow) { return navigateTo(to) }
    else {
      const destination
          = Permission.findFirstPermissionRoute(appRoutes, userStore.role)
          || NOT_FOUND
      return navigateTo(destination)
    }
  }
})
