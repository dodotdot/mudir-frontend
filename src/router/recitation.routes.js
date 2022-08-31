import { Layout, AddRecitation, ListRecitation } from '@/pages/recitation';

export default {
    path: '/recitation',
    component: Layout,
    children: [
      {
        path: '/list-recitation',
        meta: { title: 'Halaqoh Tahfidz', auth: true },
        component: ListRecitation
      },
      {
        path: '/add-recitation/:id/:userid/:type',
        meta: { title: 'Progress santri', auth: true },
        component: AddRecitation
      }
    ]
};


