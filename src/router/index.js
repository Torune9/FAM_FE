import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ForgotView from '../views/ForgotView.vue'
import ResetView from '../views/ResetView.vue'
import Dashboard from '../views/dashboard/DashboardView.vue'
import Category from '../views/category/CategoryView.vue'
import MasterAsset from'../views/master/MasterAssetView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias :'/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetView,
    },
    {
      path : '/dashboard',
      name : 'dashboard',
      component : Dashboard
    },
    {
      path : '/category-assets/:id?',
      name : 'category-assets',
      component : Category,
      props : true
    },
    {
      path : '/master-assets',
      name : 'Master-assets',
      component : MasterAsset
    },
  ]
})

export default router
