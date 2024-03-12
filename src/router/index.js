import { createRouter, createWebHistory } from 'vue-router'
import NarvaroNewView from '../views/narvaro/NarvaroNewView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/narvaro',
      name: 'narvaroNew',
      component: NarvaroNewView
    },
    {
      path: '/narvaro/personnummer',
      name: 'narvaroEditPersonNum',
      component: () => import('../views/narvaro/NarvaroEditPersonNumView.vue')
    },
    {
      path: '/narvaro/namn',
      name: 'narvaroName',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/narvaro/NarvaroNameView.vue')
    },
    {
      path: '/narvaro/typ',
      name: 'narvaroType',
      component: () => import('../views/narvaro/NarvaroTypeView.vue')
    },
    {
      path: '/narvaro/licens',
      name: 'narvaroLicense',
      component: () => import('../views/narvaro/NarvaroLicenseView.vue')
    },
    {
      path: '/narvaro/bekrafta',
      name: 'narvaroConfirm',
      component: () => import('../views/narvaro/NarvaroConfirmView.vue')
    },
    {
      path: '/narvaro/betala',
      name: 'narvaroPay',
      component: () => import('../views/narvaro/NarvaroPayView.vue')
    },
    {
      path: '/narvaro/tack',
      name: 'narvaroThanks',
      component: () => import('../views/narvaro/NarvaroThanksView.vue')
    },

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
})

export default router
