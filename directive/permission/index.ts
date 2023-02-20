import type { DirectiveBinding } from 'vue'
import _ from 'lodash'
import type { DirectiveOption } from '../index'
import { useUserStore } from '@/store'

export default <DirectiveOption>{
  name: 'permission',
  options: {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const { value } = binding
      const userStore = useUserStore()
      const { permissions } = userStore
      // const permissions = UserModule && UserModule.permissions
      if (value && permissions.length > 0) {
        const hasPermission = _.some(
          permissions,
          (val: any) => val.tag === value,
        )
        if (!hasPermission && el.parentNode)
          el.parentNode.removeChild(el)
      }
      else if (el.parentNode) {
        el.parentNode.removeChild(el)
        // throw new Error(`permission! Like v-permission="system.view"`)
      }
    },
  },
}
