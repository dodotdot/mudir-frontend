import Login from './pages/Login.vue'
import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Login, meta: { title: 'Login' } },
  {
    path: '/home',
    meta: { title: 'Home ' },
    component: Home,
    // example of route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('./pages/About.vue')
  },
  {
    path: '/list-lesson',
    meta: { title: 'Daftar Pelajaran' },
    component: () => import('./pages/ListLesson.vue')
  },
  {
    path: '/add-lesson',
    meta: { title: 'Input Mata Pelajaran' },
    component: () => import('./pages/AddLesson.vue')
  },
  {
    path: '/list-study',
    meta: { title: 'Daftar Kajian' },
    component: () => import('./pages/ListStudy.vue')
  },
  {
    path: '/add-study',
    meta: { title: 'Input Kajian' },
    component: () => import('./pages/AddStudy.vue')
  },
  {
    path: '/list-student',
    meta: { title: 'Daftar Santri' },
    component: () => import('./pages/ListStudent.vue')
  },
  {
    path: '/add-student',
    meta: { title: 'Tambah Santri' },
    component: () => import('./pages/AddStudent.vue')
  },
  {
    path: '/list-teacher',
    meta: { title: 'Daftar Ustadz' },
    component: () => import('./pages/ListTeacher.vue')
  },
  {
    path: '/add-teacher',
    meta: { title: 'Tambah Ustadz' },
    component: () => import('./pages/AddTeacher.vue')
  },
  { path: '/:path(.*)', component: NotFound },
]
