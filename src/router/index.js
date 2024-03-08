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
      path: '/narvaro/personnum',
      name: 'narvaroPersonNum',
      component: () => import('../views/NarvaroPersonNumView.vue')
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
      path: '/narvaro/type',
      name: 'narvaroType',
      component: () => import('../views/NarvaroTypeView.vue')
    },
    {
      path: '/narvaro/license',
      name: 'narvaroLicense',
      component: () => import('../views/NarvaroLicenseView.vue')
    },
    {
      path: '/narvaro/confirm',
      name: 'narvaroConfirm',
      component: () => import('../views/NarvaroConfirmView.vue')
    },
    {
      path: '/narvaro/pay',
      name: 'narvaroPay',
      component: () => import('../views/NarvaroPayView.vue')
    },
    {
      path: '/narvaro/thanks',
      name: 'narvaroThanks',
      component: () => import('../views/NarvaroThanksView.vue')
    },

    {
      path: '/gdpr',
      name: 'gdpr',
      component: () => import('../views/GDPRView.vue')
    }
  ]
})

export default router
