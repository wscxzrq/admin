import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'editor',
  path: '/editor',
  component: () => import('@/layouts/admin.vue'),
  meta: {
    title: '编辑器',
    icon: 'fa-solid fa-circle-exclamation',
    show: true,
    auth: true,
  },
  children: [
    {
      name: 'editor.base',
      path: 'base',
      component: () => import('@/views/editor/base.vue'),
      meta: {
        title: '基础编辑器',
        icon: 'fa-solid fa-circle-exclamation',
        show: true,
      },
    },
    {
      name: 'editor.markdown',
      path: 'markdown',
      component: () => import('@/views/editor/markdown.vue'),
    },
  ],
} as RouteRecordRaw;
