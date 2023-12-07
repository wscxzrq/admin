import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'errors',
  path: '/errors',
  meta: {
    title: '错误页面',
    icon: 'fa-solid fa-circle-exclamation',
    show: true,
    auth: true,
  },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: 'error.404',
      path: '404',
      component: () => import('@/views/errors/404.vue'),
      meta: {
        title: '404错误页面',
        icon: 'fa-solid fa-circle-exclamation',
        show: true,
      },
    },
    {
      name: 'error.403',
      path: '403',
      component: () => import('@/views/errors/403.vue'),
      meta: {
        title: '403错误页面',
        icon: 'fa-solid fa-circle-exclamation',
        show: true,
      },
    },
    {
      name: 'error.500',
      path: '500',
      component: () => import('@/views/errors/500.vue'),
    },
  ],
} as RouteRecordRaw;
