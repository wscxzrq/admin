import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'errors',
  path: '/errors',
  meta: { menu: { title: '错误页面', icon: 'Caution', auth: true } },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: 'error.404',
      path: '404',
      component: () => import('@/views/errors/404.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '404错误页面' },
      },
    },
    {
      name: 'error.403',
      path: '403',
      component: () => import('@/views/errors/403.vue'),
      meta: {
        menu: { title: '403错误页面' },
      },
    },
    {
      name: 'error.500',
      path: '500',
      component: () => import('@/views/errors/500.vue'),
    },
  ],
} as RouteRecordRaw;
