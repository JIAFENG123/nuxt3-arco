export default function usePermission() {
  return {
    findFirstPermissionPermissionRoute(_routers: any) {
      const cloneRouters = [..._routers]
      while (cloneRouters.length) {
        const firstElement = cloneRouters.shift()
        if (!firstElement.children || firstElement.children.length < 1)
          return { name: firstElement.name }
        if (firstElement?.children)
          cloneRouters.push(...firstElement.children)
      }
      return null
    },
    // You can add any rules you want
  }
}
