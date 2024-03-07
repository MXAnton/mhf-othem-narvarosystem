import { createRouter, createWebHistory } from 'vue-router'
import AddNarvaroView from '../views/AddNarvaroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AddNarvaroView
    },
    {
      path: '/gdpr',
      name: 'gdpr',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GDPRView.vue')
    }
  ]
})

export default router
