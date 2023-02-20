import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./modules/*.ts')

function formatModules(_modules: any, result: RouteRecordRaw[]) {
  Object.keys(_modules).forEach((key) => {
    const defaultModule = _modules[key].default
    if (!defaultModule)
      return
    const moduleList = Array.isArray(defaultModule)
      ? [...defaultModule]
      : [defaultModule]
    result.push(...moduleList)
  })
  return result
}

export const appRoutes: RouteRecordRaw[] = formatModules(modules, [])

export const appExternalRoutes: RouteRecordRaw[] = formatModules(modules, [])

// Avoid circular references, put here

export const DEFAULT_ROUTE_NAME = 'home'

export const DEFAULT_ROUTE = {
  title: 'home.menu',
  name: DEFAULT_ROUTE_NAME,
  fullPath: '/home',
}
