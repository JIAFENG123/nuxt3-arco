export interface AppState {
  theme: string // 主题切换
  colorWeak: boolean // 色弱模式？
  navbar: boolean // 显示头部导航
  menu: boolean // 显示左侧菜单
  hideMenu: boolean // < 992 隐藏
  menuCollapse: boolean // 是否收起左侧菜单
  footer: boolean // 显示底部
  themeColor: string // 主题色，未用到
  menuWidth: number // 左侧菜单栏宽度
  globalSettings: boolean // 头部页面配置切换按钮
  device: string // 视窗宽度 < 992 ? 'mobile' : 'desktop'
  tabBar: boolean // 是否显示多页签，切换路由
  [key: string]: unknown
  systemVisible: boolean // 是否显示导航路由弹窗
}
