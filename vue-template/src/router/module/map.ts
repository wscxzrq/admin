import { RouteRecordRaw } from 'vue-router';

export default {
  name: 'map',
  path: '/map',
  meta: { menu: { title: 'OpenLayers', icon: 'World', auth: true } },
  component: () => import('@/layouts/admin.vue'),
  children: [
    {
      name: '直接配置加载天地图',
      path: 'configureLayersDirectly',
      component: () => import('@/views/map/configureLayersDirectly.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '直接配置加载天地图' },
      },
    },
    {
      name: 'addLayer方式加载天地图',
      path: 'addLayerUreLayersDirectly',
      component: () => import('@/views/map/addLayerUreLayersDirectly.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: 'addLayer方式加载天地图' },
      },
    },
    {
      name: '设置地图背景',
      path: 'setMapBackground',
      component: () => import('@/views/map/setMapBackground.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '设置地图背景' },
      },
    },
    {
      name: '添加导航条',
      path: 'addNavigationBar',
      component: () => import('@/views/map/addNavigationBar.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '添加导航条' },
      },
    },
    {
      name: '添加基本操作控件',
      path: 'basicOperatingControls',
      component: () => import('@/views/map/basicOperatingControls.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '添加基本操作控件' },
      },
    },
  ],
} as RouteRecordRaw;
