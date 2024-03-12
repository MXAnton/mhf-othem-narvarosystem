import { createRouter, createWebHistory } from 'vue-router'

import addNarvaroRoutes from './addNarvaro'

const baseRoutes = [
  {
    path: '/gdpr',
    name: 'gdpr',
    component: () => import('../views/GDPRView.vue')
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

export default router
