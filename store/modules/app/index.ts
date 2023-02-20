import { defineStore } from 'pinia'
import type { AppState } from './types'
import defaultSettings from '@/config/settings.json'

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings, systemVisible: false }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state }
    },
    appDevice(state: AppState) {
      return state.device
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      this.globalSettings = partial.globalSettings as AppState['globalSettings']
      console.log('updateSettings', this.globalSettings)
      // @ts-expect-error-next-line
      this.$patch(partial)
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark'
        if (typeof window !== 'undefined') {
          document.body.setAttribute('arco-theme', 'dark')
          document.documentElement.classList.remove('light')
          document.documentElement.classList.add('dark')
        }
      }
      else {
        this.theme = 'light'
        if (typeof window !== 'undefined') {
          document.body.removeAttribute('arco-theme')
          document.documentElement.classList.remove('dark')
          document.documentElement.classList.add('light')
        }
      }
    },
    toggleDevice(device: string) {
      this.device = device
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value
    },
    toggleSystemVisible(value: boolean) {
      this.systemVisible = value
    },
  },
})

export default useAppStore
