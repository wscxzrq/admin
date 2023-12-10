import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'editor',
  path: '/editor',
  component: () => import('@/layouts/admin.vue'),
  meta: { menu: { title: '编辑器', icon: 'fa-solid fa-circle-exclamation', auth: true } },
  children: [
    {
      name: 'editor.base',
      path: 'base',
      component: () => import('@/views/editor/base.vue'),
      meta: { permissions: 'base_editor', menu: { title: '基础编辑器', icon: 'fa-solid fa-circle-exclamation' } },
    },
    {
      name: 'editor.markdown',
      path: 'markdown',
      component: () => import('@/views/editor/markdown.vue'),
      meta: {
        permissions: 'editor_markdown',
        menu: { title: 'markdown编辑器', icon: 'fa-solid fa-circle-exclamation' },
      },
    },
  ],
} as RouteRecordRaw;
