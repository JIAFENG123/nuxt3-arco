// get/bussinesstree/id 获取系统目录树，将数据存储起来；在router/index中将动态路由组装进路由数组中

import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'
import type { permissionState } from './types'
import { businessTree } from '@/api/users'
import { DEFAULT_LAYOUT } from '@/router/constants'
import type { AppRouteRecordRaw } from '@/router/routes/types'
import { routerMap } from '~~/router/routeMap'

function child(element: any, index: number) {
  const childrenMenu = element.childUserRight
  childrenMenu.push(element.childUserMenuRight[index])
}
function childrenMenus(menu: any) {
  const childMenu = menu.childUserRight ? menu.childUserRight : []
  if (menu.childUserMenuRight) {
    for (let index = 0; index < menu.childUserMenuRight.length; index += 1) {
      const element = menu.childUserMenuRight[index]
      if (element.childUserMenuRight && element.childUserMenuRight.length > 0)
        child(element, index)

      childMenu.push(element)
    }
  }
  return childMenu
}
// 根据数据组装路由格式（）
function formatRoutes(aMenu: any) {
  const aRouter = []
  for (let i = 0; i < aMenu.length; i += 1) {
    // 菜单umUrl 权限是urUrl
    const childrenMenu: any[] = childrenMenus(aMenu[i])
    let routerItem: AppRouteRecordRaw = {
      path: '',
      component: undefined,
    }
    const childRoute: AppRouteRecordRaw[] = []
    if (childrenMenu.length > 0) {
      for (let j = 0; j < childrenMenu.length; j += 1) {
        let route: AppRouteRecordRaw = {
          path: '',
          component: undefined,
        }
        if (
          childrenMenu.length > 1
          && aMenu[i].umUrl
          && routerMap[aMenu[i].umUrl.split('/')[1]]
        ) {
          routerItem = {
            path: `/${aMenu[i].umUrl.split('/')[1]}`,
            name: `${aMenu[i].umUrl.split('/')[1]}`,
            component: DEFAULT_LAYOUT,
            meta: {
              // locale: `${aMenu[i].umEnTitle}`,
              locale: routerMap[aMenu[i].umUrl.split('/')[1]].locale,
              icon: routerMap[aMenu[i].umUrl.split('/')[1]].icon,
              order: aMenu[i].umSort || 1,
              requiresAuth: true,
              noAffix: !!routerMap[aMenu[i].umUrl.split('/')[1]].noAffix,
              hideInMenu: !!routerMap[aMenu[i].umUrl.split('/')[1]].hideInMenu,
              hideChildrenInMenu:
                !!routerMap[aMenu[i].umUrl.split('/')[1]].hideChildrenInMenu,
              activeMenu:
                routerMap[aMenu[i].umUrl.split('/')[1]].activeMenu || '',
              ignoreCache:
                !!routerMap[aMenu[i].umUrl.split('/')[1]].ignoreCache,
            },
          }
          const isUm = childrenMenu[j].childUserRight
          route = {
            path: isUm
              ? `/${childrenMenu[j].umUrl.split('/')[1]}`
              : `/${childrenMenu[j].urUrl.split('/')[1]}`,
            name: isUm
              ? `${childrenMenu[j].umUrl.split('/')[1]}`
              : `${childrenMenu[j].urUrl.split('/')[1]}`,
            component: isUm
              ? routerMap[childrenMenu[j].umUrl.split('/')[1]].component
              : routerMap[childrenMenu[j].urUrl.split('/')[1]].component,
            meta: {
              locale: isUm
                ? routerMap[childrenMenu[j].umUrl.split('/')[1]].locale
                : routerMap[childrenMenu[j].urUrl.split('/')[1]].locale,
              icon: isUm
                ? routerMap[childrenMenu[j].umUrl.split('/')[1]].icon
                : routerMap[childrenMenu[j].urUrl.split('/')[1]].icon,
              order: isUm ? childrenMenu[j].umSort : childrenMenu[j].urSort,
              requiresAuth: true,
              noAffix: isUm
                ? !!routerMap[childrenMenu[j].umUrl.split('/')[1]].noAffix
                : !!routerMap[childrenMenu[j].urUrl.split('/')[1]].noAffix,
              hideInMenu: isUm
                ? !!routerMap[childrenMenu[j].umUrl.split('/')[1]].hideInMenu
                : !!routerMap[childrenMenu[j].urUrl.split('/')[1]].hideInMenu,
              hideChildrenInMenu: isUm
                ? !!routerMap[childrenMenu[j].umUrl.split('/')[1]]
                    .hideChildrenInMenu
                : !!routerMap[childrenMenu[j].urUrl.split('/')[1]]
                    .hideChildrenInMenu,
              activeMenu: isUm
                ? routerMap[childrenMenu[j].umUrl.split('/')[1]].activeMenu
                : routerMap[childrenMenu[j].urUrl.split('/')[1]].activeMenu,
              ignoreCache: isUm
                ? !!routerMap[childrenMenu[j].umUrl.split('/')[1]].ignoreCache
                : !!routerMap[childrenMenu[j].urUrl.split('/')[1]].ignoreCache,
            },
          }
        }
        else {
          if (
            childrenMenu[j].urUrl
            && routerMap[childrenMenu[j].urUrl.split('/')[1]]
          ) {
            routerItem = {
              path: `/${aMenu[i].umUrl.split('/')[1]}`,
              name: `${aMenu[i].umUrl.split('/')[1]}`,
              component: DEFAULT_LAYOUT,
              meta: {
                locale: routerMap[aMenu[i].umUrl.split('/')[1]]
                  ? routerMap[aMenu[i].umUrl.split('/')[1]].locale
                  : routerMap[childrenMenu[j].urUrl.split('/')[1]].locale,
                icon: routerMap[aMenu[i].umUrl.split('/')[1]]
                  ? routerMap[aMenu[i].umUrl.split('/')[1]].icon
                  : routerMap[childrenMenu[j].urUrl.split('/')[1]].icon,
                order: aMenu[i].umSort || 1,
                requiresAuth: true,
                noAffix: routerMap[aMenu[i].umUrl.split('/')[1]]
                  ? !!routerMap[aMenu[i].umUrl.split('/')[1]].noAffix
                  : !!routerMap[childrenMenu[j].urUrl.split('/')[1]].noAffix,
                hideInMenu: routerMap[aMenu[i].umUrl.split('/')[1]]
                  ? !!routerMap[aMenu[i].umUrl.split('/')[1]].hideInMenu
                  : !!routerMap[childrenMenu[j].urUrl.split('/')[1]].hideInMenu,
                hideChildrenInMenu: routerMap[aMenu[i].umUrl.split('/')[1]]
                  ? !!routerMap[aMenu[i].umUrl.split('/')[1]].hideChildrenInMenu
                  : !!routerMap[childrenMenu[j].urUrl.split('/')[1]]
                      .hideChildrenInMenu,
                activeMenu:
                  routerMap[childrenMenu[j].urUrl.split('/')[1]].activeMenu
                  || '',
                ignoreCache: routerMap[aMenu[i].umUrl.split('/')[1]]
                  ? !!routerMap[aMenu[i].umUrl.split('/')[1]].ignoreCache
                  : !!routerMap[childrenMenu[j].urUrl.split('/')[1]]
                      .ignoreCache,
                isShow: routerMap[aMenu[i].umUrl.split('/')[1]]
                  ? !!routerMap[aMenu[i].umUrl.split('/')[1]].isShow
                  : !!routerMap[childrenMenu[j].urUrl.split('/')[1]].isShow,
              },
            }
            route = {
              path: `${childrenMenu[j].urUrl}`,
              name: `${childrenMenu[j].urUrl.split('/')[1]}`,
              component:
                routerMap[childrenMenu[j].urUrl.split('/')[1]].component,
              meta: {
                locale: routerMap[childrenMenu[j].urUrl.split('/')[1]].locale,
                icon: routerMap[childrenMenu[j].urUrl.split('/')[1]].icon,
                order: childrenMenu[j].urSort || 1,
                requiresAuth: true,
                noAffix:
                  !!routerMap[childrenMenu[j].urUrl.split('/')[1]].noAffix,
                hideInMenu:
                  !!routerMap[childrenMenu[j].urUrl.split('/')[1]].hideInMenu,
                // hideChildrenInMenu:
                //   !!routerMap[childrenMenu[j].urUrl.split('/')[1]]
                //     .hideChildrenInMenu,
                activeMenu:
                  routerMap[childrenMenu[j].urUrl.split('/')[1]].activeMenu
                  || '',
                ignoreCache:
                  !!routerMap[childrenMenu[j].urUrl.split('/')[1]].ignoreCache,
              },
            }
          }
        }
        childRoute.push(route)
        routerItem.children = childRoute
      }
    }
    else {
      console.log('单层菜单')
    }
    aRouter.push(routerItem as RouteRecordRaw)
  }
  const arr = [] as any
  if (aRouter.length > 0) {
    aRouter.forEach((ele) => {
      if (ele.path)
        arr.push(ele)
    })
  }
  return arr
}

const usePermissionStore = defineStore('permission', {
  state: (): permissionState => ({
    routes: [], // 动态路由
  }),

  getters: {
    permission(state: permissionState): permissionState {
      return { ...state }
    },
  },
  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      // @ts-expect-error-next-line
      this.$patch({ routes })
    },
    // 获取权限菜单
    async GenerateRoutes(id: number) {
      const treeData: any = await businessTree(id)
      const routerformat: RouteRecordRaw[] = formatRoutes(treeData.data)
      this.setRoutes(routerformat)
      return new Promise((resolve, reject) => {
        if (treeData)
          resolve(treeData)
        else
          reject(new Error('No request to URL parameters'))
      })
    },
  },
})

export default usePermissionStore
