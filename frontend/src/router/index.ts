import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAlertStore} from "@/stores/alert";
import {useAuthStore} from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import('../views/LogoutView.vue')
    },
    {
      path: '/todo',
      name: 'todo',
      component: () => import('../views/TodoView.vue')
    },
    {
      path: '/todo-groups',
      name: 'todo-groups',
      component: () => import('../views/TodoGroupView.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/StatisticsView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    }
  ]
})
router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();
  const alertStore = useAlertStore();
  alertStore.clear();
  if (authRequired && !authStore.accessToken) {
    authStore.returnUrl = to.fullPath;
    return '/login';
  }
});

export default router
