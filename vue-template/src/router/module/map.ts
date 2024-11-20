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
    {
      name: '加载图层控件',
      path: 'loadLayerControl',
      component: () => import('@/views/map/loadLayerControl.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '加载图层控件' },
      },
    },
    {
      name: '鼠标位置控件',
      path: 'mousePositionControl',
      component: () => import('@/views/map/mousePositionControl.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '鼠标位置控件' },
      },
    },
    {
      name: '比例尺控件',
      path: 'mousePositionControl',
      component: () => import('@/views/map/scaleControl.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '比例尺控件' },
      },
    },
    {
      name: '简单鹰眼控件',
      path: 'easyEagleEyeControls',
      component: () => import('@/views/map/easyEagleEyeControls.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '简单鹰眼控件' },
      },
    },
    {
      name: '自定义鹰眼控件',
      path: 'customEagleEyeControl',
      component: () => import('@/views/map/customEagleEyeControl.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '自定义鹰眼控件' },
      },
    },
    {
      name: '全屏控件',
      path: 'fullScreenControl',
      component: () => import('@/views/map/fullScreenControl.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '全屏控件' },
      },
    },
    {
      name: '图层探查',
      path: 'layerExploration',
      component: () => import('@/views/map/layerExploration.vue'),
      meta: {
        enterClass: 'animate__fadeInRight',
        leaveClass: 'animate__fadeOutLeft',
        menu: { title: '图层探查' },
      },
    },
  ],
} as RouteRecordRaw;
