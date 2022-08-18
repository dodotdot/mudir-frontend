import { Layout, DetailTeacher, AddTeacher, ListTeacher } from '@/pages/teachers';

export default {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: '/list-teacher',
        meta: { title: 'Daftar Ustadz', auth: true },
        component: ListTeacher
      },
      {
        path: '/add-teacher',
        meta: { title: 'Tambah Ustadz', auth: true },
        component: AddTeacher
      },
      {
        path: '/edit-teacher/:id',
        meta: { title: 'Ubah Ustadz', auth: true },
        component: AddTeacher
      },
      {
        path: '/detail-Teacher/:id',
        meta: { title: 'Data Ustadz', auth: true },
        component: DetailTeacher
      }
    ]
};


