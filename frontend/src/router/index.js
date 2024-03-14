import { createRouter, createWebHistory } from 'vue-router'

import addNarvaroRoutes from './addNarvaro'

import { useAdminStore } from '@/stores/admin'

const baseRoutes = [
  {
    path: '/gdpr',
    name: 'gdpr',
    component: () => import('../views/GDPRView.vue'),
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/admin/AdminLoginView.vue'),
    meta: {
      noAdmin: true
    }
  },

  {
    path: '/:catchAll(.*)*',
    redirect: '/narvaro'
  }
]
const routes = baseRoutes.concat(addNarvaroRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  const adminStore = useAdminStore()

  // If user stored is null and user refreshed or
  //    loaded page first time
  if (adminStore.userId == null || from.name == null) {
    await adminStore.getLoggedInAdmin()
  }

  if (adminStore.userId == null && to.matched.some((record) => record.meta.onlyAdmin)) {
    // Page requires user to be logged in, redirect to login
    next({ name: 'login' })
    return
  }

  if (adminStore.userId != null && to.matched.some((record) => record.meta.noAdmin)) {
    // Page only allows non logged in users, logout
    await adminStore.logout()
  }

  next()
})

export default router
