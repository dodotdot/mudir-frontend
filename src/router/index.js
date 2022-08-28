import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useAlertStore } from '@/store';

import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import NotFound from '../pages/NotFound.vue'
import studentRoutes from './student.routes';
import teacherRoutes from './teacher.routes';
import studyRoutes from './study.routes';
import lessonRoutes from './lesson.routes';
import recitationRoutes from './recitation.routes';


export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Login, meta: { title: 'Login', auth: false } },
    {
      path: '/home',
      meta: { title: 'Home ', auth: true },
      component: Home,
      // example of route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('./pages/About.vue')
    },
    { ...studentRoutes },
    { ...teacherRoutes },
    { ...studyRoutes },
    { ...lessonRoutes },
    { ...recitationRoutes},
    { path: '/:path(.*)', component: NotFound },
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath;
      return '/';
  }
});
