import { createRouter, createWebHistory } from 'vue-router'

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
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue'),
  },
  {
    path: '/start',
    name: 'start',
    component: () => import('../views/Start.vue'),
  },
  {
    path: '/user/food-diary',
    name: 'food-diary',
    component: () => import('../views/FoodDiary.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router