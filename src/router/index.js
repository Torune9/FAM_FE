import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotView from '../views/ForgotView.vue'
import ResetView from '../views/ResetView.vue'
import Dashboard from '../views/dashboard/DashboardView.vue'
import Category from '../views/category/CategoryView.vue'
import MasterAsset from'../views/master/MasterAssetView.vue'
import Asset from '../views/asset/AssetView.vue'
import History from '../views/history/HistoryView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import DetailAttachments from '../views/DetailAttachments.vue'


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
      path: '/register',
      alias :'/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotView,
    },
    {
      path: '/reset-password/:token',
      name: 'reset-password',
      component: ResetView,
    },
    {
      path : '/dashboard',
      name : 'dashboard',
      component : Dashboard
    },
    {
      path : '/category-assets/',
      name : 'category-assets',
      component : Category,
    },
    {
      path : '/master-assets',
      name : 'Master-assets',
      component : MasterAsset
    },
    {
      path : '/assets',
      name : 'assets',
      component : Asset
    },
    {
      path : '/history',
      name : 'history',
      component : History
    },
    {
      path : '/detail/:code',
      name : 'detail',
      component : DetailAttachments
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ]
})

export default router
