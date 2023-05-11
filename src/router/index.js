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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router