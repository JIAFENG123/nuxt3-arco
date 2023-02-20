import { DEFAULT_LAYOUT } from './constants'

interface RouteItem {
  icon?: string
  locale?: string
  noAffix?: boolean
  isShow?: boolean
  component?: () => Promise<typeof import('*.vue')>
}
export const routerMap: { [key: string]: RouteItem } = {
  homeMenu: {
    icon: 'icon-home',
    locale: 'test.menu', // 中英文，
    noAffix: true,
    isShow: true, // 若父级只包含一个子级，父级想显示在左侧菜单栏，需单独配置父级(中英文)并设置isShow属性为true（之前父级只包含一个子级的默认不显示父级）----仅对父级只包含一个子级结构生效
    component: () => import('@/views/home/index.vue'),
  },
  home: {
    icon: 'icon-home',
    locale: 'home.menu', // 中英文，
    component: () => import('@/views/home/index.vue'),
  },
  dashboard: {
    icon: 'icon-dashboard',
    locale: 'menu.dashboard', // 中英文，
    component: DEFAULT_LAYOUT,
  },
  policyMap: {
    icon: 'icon-home',
    locale: 'home.policyMap', // 中英文，
    // hideInMenu: true,
    // ignoreCache: true,
    component: () => import('@/views/test/index.vue'),
  },
  policyTag: {
    icon: 'icon-home',
    locale: 'home.policyTag', // 中英文，
    component: () => import('@/views/not-found/index.vue'),
  },
}
