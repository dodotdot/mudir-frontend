import { Layout, DetailStudent, AddStudent, ListStudent } from '@/pages/students';

export default {
    path: '/users',
    component: Layout,
    children: [
        {
            path: '/list-student',
            meta: { title: 'Daftar Santri', auth: true },
            component: ListStudent
          },
          {
            path: '/add-student',
            meta: { title: 'Tambah Santri', auth: true },
            component: AddStudent
          },
          {
            path: '/edit-student/:id',
            meta: { title: 'Ubah Santri', auth: true },
            component: AddStudent
          },
          {
            path: '/detail-student/:id',
            meta: { title: 'Data Santri', auth: true },
            component: DetailStudent
          }
    ]
};


