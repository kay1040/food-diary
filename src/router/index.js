import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/auth-form',
    name: 'auth-form',
    component: () => import('../views/AuthForm.vue'),
  },
  {
    path: '/user/information',
    name: 'userInfo',
    component: () => import('../views/UserInfo.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/password',
    name: 'password',
    component: () => import('../views/Password.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('../views/Start.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/food-diary',
    name: 'food-diary',
    component: () => import('../views/FoodDiary.vue'),
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/auth-form')
  } else if (to.name === 'auth-form' && auth.isLoggedIn) {
    router.back()
  } else {
    next()
  }
})


export default router