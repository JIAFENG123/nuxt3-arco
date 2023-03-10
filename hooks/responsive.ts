import { onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useAppStore } from '@/store'
import { addEventListen, removeEventListen } from '@/utils/event'

const WIDTH = 992 // https://arco.design/vue/component/grid#responsivevalue

function queryDevice() {
  const rect = typeof window !== 'undefined' ? document.body.getBoundingClientRect() : { width: 0 }
  return rect.width - 1 < WIDTH
}

export default function useResponsive(immediate?: boolean) {
  const appStore = useAppStore()
  function resizeHandler() {
    if (typeof window !== 'undefined' && !document.hidden) {
      const isMobile = queryDevice()
      appStore.toggleDevice(isMobile ? 'mobile' : 'desktop')
      appStore.toggleMenu(isMobile)
    }
  }
  const debounceFn = useDebounceFn(resizeHandler, 100)
  onMounted(() => {
    if (immediate)
      debounceFn()
  })
  onBeforeMount(() => {
    addEventListen(typeof window !== 'undefined' ? window : null as any, 'resize', debounceFn)
  })
  onBeforeUnmount(() => {
    removeEventListen(typeof window !== 'undefined' ? window : null as any, 'resize', debounceFn)
  })
}
