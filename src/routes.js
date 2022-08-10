import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore, useAlertStore } from '@/store';

import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'


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
    {
      path: '/list-lesson',
      meta: { title: 'Daftar Pelajaran', auth: true },
      component: () => import('./pages/ListLesson.vue')
    },
    {
      path: '/add-lesson',
      meta: { title: 'Input Mata Pelajaran', auth: true },
      component: () => import('./pages/AddLesson.vue')
    },
    {
      path: '/list-study',
      meta: { title: 'Daftar Kajian', auth: true },
      component: () => import('./pages/ListStudy.vue')
    },
    {
      path: '/add-study',
      meta: { title: 'Input Kajian', auth: true },
      component: () => import('./pages/AddStudy.vue')
    },
    {
      path: '/list-student',
      meta: { title: 'Daftar Santri', auth: true },
      component: () => import('./pages/ListStudent.vue')
    },
    {
      path: '/add-student',
      meta: { title: 'Tambah Santri', auth: true },
      component: () => import('./pages/AddStudent.vue')
    },
    {
      path: '/detail-student/:student_id',
      meta: { title: 'Data Santri', auth: true },
      component: () => import('./pages/DetailStudent.vue')
    },
    {
      path: '/list-teacher',
      meta: { title: 'Daftar Ustadz', auth: true },
      component: () => import('./pages/ListTeacher.vue')
    },
    {
      path: '/add-teacher',
      meta: { title: 'Tambah Ustadz', auth: true },
      component: () => import('./pages/AddTeacher.vue')
    },
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
