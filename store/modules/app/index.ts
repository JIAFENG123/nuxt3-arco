import { defineStore } from 'pinia'
import { Notification } from '@arco-design/web-vue'
import type { NotificationReturn } from '@arco-design/web-vue/es/notification/interface'
import type { RouteRecordNormalized } from 'vue-router'
import type { AppState } from './types'
import defaultSettings from '@/config/settings.json'
import { getMenuList } from '@/api/user'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
    appAsyncMenus(state: AppState): RouteRecordNormalized[] {
      return state.serverMenu as unknown as RouteRecordNormalized[]
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-expect-error-next-line
      this.$patch(partial)
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        // eslint-disable-next-line no-unused-expressions
        typeof window !== 'undefined' ? document.body.setAttribute('arco-theme', 'dark') : null
      }
      else {
        this.theme = 'light'
        // eslint-disable-next-line no-unused-expressions
        typeof window !== 'undefined' ? document.body.removeAttribute('arco-theme') : null
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    async fetchServerMenuConfig() {
      let notifyInstance: NotificationReturn | null = null
      try {
        notifyInstance = Notification.info({
          id: 'menuNotice', // Keep the instance id the same
          content: 'loading',
          closable: true,
        })
        const { data } = await getMenuList()
        this.serverMenu = data
        notifyInstance = Notification.success({
          id: 'menuNotice',
          content: 'success',
          closable: true,
        })
      }
      catch (error) {
        notifyInstance = Notification.error({
          id: 'menuNotice',
          content: 'error',
          closable: true,
        })
      }
    },
    clearServerMenu() {
      this.serverMenu = []
    },
  },
})

export default useAppStore
