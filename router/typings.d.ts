import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean // Whether login is required to access the current page (every route must declare) ==> 是否需要登录鉴权
    icon?: string // The icon show in the side menu ==> 菜单配置icon
    locale?: string // The locale name show in side menu and breadcrumb ==> 一级菜单名
    hideInMenu?: boolean // If true, it is not displayed in the side menu ==> 是否在左侧菜单中隐藏该项，子菜单也生效
    hideChildrenInMenu?: boolean // if set true, the children are not displayed in the side menu ==> 强制在左侧菜单中显示单项,设置在父菜单才生效
    activeMenu?: string // if set name, the menu will be highlighted according to the name you set ==> 高亮设置的菜单项
    order?: number // Sort routing menu items. If set key, the higher the value, the more forward it is ==> 排序路由菜单项。如果设置该值，值越高，越靠前
    noAffix?: boolean // if set true, the tag will not affix in the tab-bar ==> 如果设置为true，标签将不会添加到tab-bar中
    ignoreCache?: boolean // if set true, the page will not be cached ==> 如果设置为true页面将不会被缓存
  }
}
