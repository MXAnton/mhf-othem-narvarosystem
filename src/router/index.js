import { createRouter, createWebHistory } from 'vue-router'
import AddNarvaroView from '../views/AddNarvaroView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/narvaro'
    },
    {
      path: '/narvaro',
      name: 'addNarvaro',
      component: AddNarvaroView
    },
    {
      path: '/narvaro/name',
      name: 'narvaroName',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NarvaroNameView.vue')
    },
    {
      path: '/narvaro/membership',
      name: 'narvaroMembership',
      component: () => import('../views/NarvaroMembershipView.vue')
    },

    {
      path: '/gdpr',
      name: 'gdpr',
      component: () => import('../views/GDPRView.vue')
    }
  ]
})

export default router
