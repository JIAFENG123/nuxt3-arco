import type { AppRouteRecordRaw } from '../types'
import { DEFAULT_LAYOUT } from '@/router/constants'

const DASHBOARD: AppRouteRecordRaw = {
  path: '/navigation',
  name: 'navigation',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'common.navigation',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: '/systemNavigation',
      name: 'systemNavigation',
      component: () => import('@/views/home/index.vue'),
      meta: {
        locale: 'common.navigation.systemNavigation',
        requiresAuth: true,
      },
    },
  ],
}

export default DASHBOARD
