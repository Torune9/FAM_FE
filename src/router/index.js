import { createRouter, createWebHistory} from 'vue-router'
import LoginView from '../views/authenticated/LoginView.vue'
import RegisterView from '../views/authenticated/RegisterView.vue'
import ForgotView from '../views/authenticated/ForgotView.vue'
import ResetView from '../views/authenticated/ResetView.vue'
import Dashboard from '../views/dashboard/DashboardView.vue'
import Category from '../views/category/CategoryView.vue'
import MasterAsset from'../views/master/MasterAssetView.vue'
import Asset from '../views/asset/AssetView.vue'
import History from '../views/history/HistoryView.vue'
import NotFoundView from '../views/notFound/NotFoundView.vue'
import DetailAttachments from '../views/history/DetailAttachments.vue'
import navGuard from '../service/navigationGuard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias : '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
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
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/category-assets/',
      name: 'category-assets',
      component: Category,
      meta: { requiresAuth: true },
    },
    {
      path: '/master-assets',
      name: 'Master-assets',
      component: MasterAsset,
      meta: { requiresAuth: true },
    },
    {
      path: '/assets',
      name: 'assets',
      component: Asset,
      meta: { requiresAuth: true },
    },
    {
      path: '/history',
      name: 'history',
      component: History,
      meta: { requiresAuth: true },
    },
    {
      path: '/detail/:code',
      name: 'detail',
      component: DetailAttachments,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ]
});

router.beforeEach(navGuard)
export default router;

