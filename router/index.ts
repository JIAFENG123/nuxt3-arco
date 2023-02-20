import { createRouter, createWebHistory } from 'vue-router'
import 'nprogress/nprogress.css'

// import { appRoutes } from './routes'
import createRouteGuard from './guard'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    // ...appRoutes,
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'notFound',
    //   component: () => import('@/views/not-found/index.vue'),
    // },
    {
      path: '/notFound',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})
// 动态路由component

createRouteGuard(router)

export default router
