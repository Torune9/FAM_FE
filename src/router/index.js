import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ForgotView from '../views/ForgotView.vue'
import ResetView from '../views/ResetView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotView
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetView
    },
  ]
})

export default router
