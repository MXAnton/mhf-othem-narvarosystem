import NarvaroNewView from '../views/narvaro/NarvaroNewView.vue'

const addNarvaroRoutes = [
  {
    path: '/admin/narvarolista',
    name: 'narvaroList',
    component: () => import('../views/admin/NarvaroListView.vue'),
    meta: {
      onlyAdmin: true
    }
  },
  {
    path: '/narvaro',
    name: 'narvaroNew',
    component: NarvaroNewView,
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/narvaro/personnummer',
    name: 'narvaroEditPersonNum',
    component: () => import('../views/narvaro/NarvaroEditPersonNumView.vue'),
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/narvaro/namn',
    name: 'narvaroName',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/narvaro/NarvaroNameView.vue'),
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/narvaro/typ',
    name: 'narvaroType',
    component: () => import('../views/narvaro/NarvaroTypeView.vue'),
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/narvaro/licens',
    name: 'narvaroLicense',
    component: () => import('../views/narvaro/NarvaroLicenseView.vue'),
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/narvaro/bekrafta',
    name: 'narvaroConfirm',
    component: () => import('../views/narvaro/NarvaroConfirmView.vue'),
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/narvaro/betala',
    name: 'narvaroPay',
    component: () => import('../views/narvaro/NarvaroPayView.vue'),
    meta: {
      noAdmin: true
    }
  },
  {
    path: '/narvaro/tack',
    name: 'narvaroThanks',
    component: () => import('../views/narvaro/NarvaroThanksView.vue'),
    meta: {
      noAdmin: true
    }
  }
]

export default addNarvaroRoutes
