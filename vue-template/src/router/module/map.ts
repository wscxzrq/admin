import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'map',
  path: '/map',
  meta: { menu: { title: 'OpenLayers', icon: 'World', auth: true } },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: '加载天地图',
      path: 'tianditu',
      component: () => import('@/views/map/loadTheSkyMap.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '加载天地图的多种方式' },
      },
    },
  ],
} as RouteRecordRaw;
