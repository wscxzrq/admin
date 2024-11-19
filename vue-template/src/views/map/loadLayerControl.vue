<template>
  <div id="map" class="h-[100%] w-[100%] absolute">
    <div class="map-switch" @mouseleave="moveActive()">
      <div v-for="(baseLayer, index) in baseLayers" :key="index" class="switch-map-btn" :title="baseLayer.title" :class="baseLayer.type === activeLayerType ? 'active' : ''" @click="changeMap(baseLayer.type)">
        <img :src="baseLayer.img" />
        <span class="showMapName">{{ baseLayer.title }} </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { defaults as defaultControls } from 'ol/control';
  import { Map, View } from 'ol';
  import { getLayerGroup } from './index.ts';
  import tdt_vec from '/images/tdt_vec.png';
  import tdt_terrain from '/images/tdt_terrain.png';
  import tdt_img from '/images/tdt_img.png';
  import { fromLonLat } from 'ol/proj';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';

  class baseMap {
    // 天地图矢量图层
    public TDT_VEC = getLayerGroup([
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
    ]);

    // 天地图影像图层
    public TDT_IMG = getLayerGroup([
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
    ]);

    // 天地图影像
    public TDT_TERRAIN = getLayerGroup([
      new TileLayer({
        source: new XYZ({
          url: `http://t{0-6}.tianditu.gov.cn/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
      new TileLayer({
        source: new XYZ({
          url: `http://t{0-6}.tianditu.gov.cn/DataServer?T=cta_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
    ]);

    // 天地图蓝色底图
    public TDT_BLUE_VEC = getLayerGroup([
      new TileLayer({
        className: 'blueLayer',
        source: new XYZ({
          url: `http://t1.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
      new TileLayer({
        className: 'blueLayer',
        source: new XYZ({
          url: `http://t1.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
    ]);
  }
  const activeLayerType = ref('');

  const olMap = ref<Map>();

  let basemap = new baseMap();

  const baseLayers = ref([
    { title: '地图', type: 'tdt_vec', img: tdt_vec },
    { title: '影像', type: 'tdt_img', img: tdt_img },
    { title: '地形', type: 'tdt_terrain', img: tdt_terrain },
  ]);
  const initMap = () => {
    olMap.value = new Map({
      target: 'map',
      layers: [getLayerByType('tdt_vec')],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([118.78, 32.07]),
        zoom: 12,
      }),
    });
  };
  // 更换底图
  const changeMap = (type: string) => {
    activeLayerType.value = type;
    changeBaseMap(type);
  };
  const moveActive = () => {
    setTimeout(() => {
      let activeLayer = baseLayers.value.find(ele => ele.type === activeLayerType.value);
      baseLayers.value = baseLayers.value.filter(ele => ele.type !== activeLayerType.value);
      baseLayers.value.push(activeLayer!);
    }, 500);
  };

  // 更换底图
  const changeBaseMap = (type: string) => {
    // 检查地图对象中是否存在图层。 如果有，调用 removeAt(0) 方法移除第一个图层（通常是底图层）。
    if (olMap.value!.getLayers()) olMap.value!.getLayers().removeAt(0);
    // 获取图层
    const baseLayer = getLayerByType(type);
    // 使用 insertAt(0, baseLayer) 将新的底图图层插入到图层列表的第一个位置，确保它作为底图渲染。
    olMap.value!.getLayers().insertAt(0, baseLayer);
  };

  onMounted(() => {
    initMap();
    activeLayerType.value = 'tdt_vec';
    moveActive();
  });

  // 根据类型获取图层
  const getLayerByType = (type: string) => {
    let layer;
    switch (type) {
      case 'tdt_blue_vec':
        layer = basemap.TDT_BLUE_VEC;
        break;
      case 'tdt_vec':
        layer = basemap.TDT_VEC;
        break;
      case 'tdt_img':
        layer = basemap.TDT_IMG;
        break;
      case 'tdt_terrain':
        layer = basemap.TDT_TERRAIN;
        break;
      default:
        layer = basemap.TDT_IMG;
        break;
    }
    return layer;
  };
</script>

<style lang="scss" scoped>
.map-switch {
  display: inline-block;
  transition: all 0.5s;
  height: 100px;
  position: absolute;
  right: 250px;
  bottom: 50px;
  z-index: 10;
}

.map-switch:hover .switch-map-btn {
  margin-left: 8px;
  opacity: 1;
}
.switch-map-btn {
  cursor: pointer;
  padding: 0;
  border-radius: 2px;
  width: 150px;
  margin-left: -145px;
  height: 100px;
  border-radius: 6px;
  position: relative;
  top: 0;
  color: #fff;
  display: inline-block;
  margin-bottom: 0;
  opacity: 0.4;
  transition: all 0.8s;
  border: 2px solid transparent;
}

.switch-map-btn img {
  height: 100%;
  width: 100%;
  border-radius: 6px;
}

.switch-map-btn:last-child {
  opacity: 1;
}
.switch-map-btn.active {
  border: 2px solid #1684ff;
  .showMapName {
    border-radius: 0 4px 0 4px;
    background: #1684ff;
    color: #ffffff;
  }
}

.showMapName {
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 45px;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.77);
  border-radius: 0px 4px 0px 4px;
}
.map-active::before {
  content: '';
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 16px;
  width: 100%;
}
</style>