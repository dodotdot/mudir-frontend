import { Layout, DetailStudy, AddStudy, ListStudy } from '@/pages/study';

export default {
    path: '/study',
    component: Layout,
    children: [
      {
        path: '/list-study',
        meta: { title: 'Daftar Kajian', auth: true },
        component: ListStudy
      },
      {
        path: '/add-study',
        meta: { title: 'Tambah Kajian', auth: true },
        component: AddStudy
      },
      {
        path: '/edit-study/:id',
        meta: { title: 'Ubah Kajian', auth: true },
        component: AddStudy
      },
      {
        path: '/detail-study/:id',
        meta: { title: 'Data Kajian', auth: true },
        component: DetailStudy
      }
    ]
};


