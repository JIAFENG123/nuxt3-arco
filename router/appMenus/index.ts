import { appRoutes } from '../routes'
import { usePermissionStore } from '@/store'

const permissionStore = usePermissionStore()
const mixinRoutes = [...appRoutes, ...permissionStore.routes]

const appClientMenus = mixinRoutes.map((el) => {
  const { name, path, meta, redirect, children } = el
  return {
    name,
    path,
    meta,
    redirect,
    children,
  }
})

export default appClientMenus
