import { Layout, DetailLesson, AddLesson, ListLesson } from '@/pages/lesson';

export default {
    path: '/lesson',
    component: Layout,
    children: [
      {
        path: '/list-lesson',
        meta: { title: 'Daftar Pelajaran', auth: true },
        component: ListLesson
      },
      {
        path: '/add-lesson',
        meta: { title: 'Tambah Pelajaran', auth: true },
        component: AddLesson
      },
      {
        path: '/edit-lesson/:id',
        meta: { title: 'Ubah Pelajaran', auth: true },
        component: AddLesson
      },
      {
        path: '/detail-lesson/:id',
        meta: { title: 'Data Pelajaran', auth: true },
        component: DetailLesson
      }
    ]
};


