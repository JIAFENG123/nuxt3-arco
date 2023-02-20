import type { App, ObjectDirective, Plugin } from 'vue'

// 自定义指令集
import permission from './permission'
import clipboard from './clipboard'

// 定义指令选项类别
export interface DirectiveOption {
  name: string // 指令名
  options: ObjectDirective // 指令选项
}

// 构建指令集
const directives: DirectiveOption[] = [permission, clipboard]

// export default {
//   install(Vue: App) {
//     Vue.directive('permission', permission)
//   },
// }

export default <Plugin>{
  install: (app: App) => {
    // 安装指令集
    directives.forEach((item) => {
      app.directive(item.name, item.options)
    })
  },
}
