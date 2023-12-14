import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'editor',
  path: '/editor',
  component: () => import('@/layouts/admin.vue'),
  meta: { menu: { title: '编辑器', icon: 'EditOne', auth: true } },
  children: [
    {
      name: 'wangeditor',
      path: 'wangeditor',
      component: () => import('@/views/editor/wangeditor.vue'),
      meta: { permissions: 'base_editor', menu: { title: '基础编辑器' } },
    },
    {
      name: 'editor.markdown',
      path: 'markdown',
      component: () => import('@/views/editor/markdown.vue'),
      meta: {
        permissions: 'editor_markdown',
        menu: { title: 'markdown编辑器' },
      },
    },
  ],
} as RouteRecordRaw;
