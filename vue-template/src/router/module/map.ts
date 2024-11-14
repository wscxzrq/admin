import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'map',
  path: '/map',
  meta: { menu: { title: 'OpenLayers', icon: 'World', auth: true } },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: '直接配置加载天地图',
      path: 'tianditu',
      component: () => import('@/views/map/configureLayersDirectly.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '直接配置加载天地图' },
      },
    },
    {
      name: 'addLayer方式加载天地图',
      path: 'tianditu2',
      component: () => import('@/views/map/addLayerUreLayersDirectly.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: 'addLayer方式加载天地图' },
      },
    },
  ],
} as RouteRecordRaw;
