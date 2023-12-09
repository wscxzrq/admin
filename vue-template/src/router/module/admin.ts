import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'admin',
  path: '/admin',
  component: () => import('@/layouts/admin.vue'),
  redirect: '/admin/home',
  meta: { auth: true },
  children: [
    {
      name: 'admin.home',
      path: 'home',
      component: () => import('@/views/admin/home.vue'),
      meta: { menu: { title: '主页' } },
    },
  ],
} as RouteRecordRaw;
