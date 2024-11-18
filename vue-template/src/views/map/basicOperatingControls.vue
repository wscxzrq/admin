<template>
  <div class="mapbox h-[100%] w-[100%]">
    <div class="mb-5 ">
      <el-button type="primary" @click="zoomOut">缩小</el-button>
      <el-button type="primary" @click="enlarge">放大</el-button>
      <el-button type="primary" @click="panToChina">平移到中国</el-button>
      <el-button type="primary" @click="reset">复位</el-button>
    </div>
    <div id="map" class="h-[100%] w-[100%] absolute"></div>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { fromLonLat } from 'ol/proj.js';
  import { Coordinate } from 'ol/coordinate';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';
  const map = ref<Map>();
  // 地图视图
  const view = ref<View>();
  // 缩放
  const zoom = ref<number>();
  let zoomCon: number = 0;
  const center = ref<Coordinate | undefined>();
  const initMap = () => {
    map.value = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
            crossOrigin: 'anomymous',
            wrapX: true,
          }),
          preload: Infinity,
        }),
        new TileLayer({
          source: new XYZ({
            url: `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${key}`,
            crossOrigin: 'anomymous',
            wrapX: true,
          }),
          preload: Infinity,
        }),
      ],
      view: new View({
        projection: 'EPSG:3857',
        zoom: 2,
        //最小级别
        minZoom: 1,
        //最大级别
        maxZoom: 18,
        center: [0, 0],
      }),
    });
  };
  // 缩小
  const zoomOut = () => {
    if (zoom.value) {
      let multiple = Math.floor((zoom.value -= 1));
      view.value?.setZoom(multiple);
    }
  };
  // 放大
  const enlarge = () => {
    if (zoom.value) {
      let multiple = Math.floor((zoom.value += 1));
      view.value?.setZoom(multiple);
    }
  };
  // 平移到中国
  const panToChina = () => {
    const beijing = fromLonLat([105, 35]);
    if (view.value) {
      view.value.setZoom(5);
      view.value.setCenter(beijing);
    }
  };

  // 复位
  const reset = () => {
    if (view.value) {
      view.value.setCenter(center.value);
      view.value.setZoom(zoomCon!);
    }
  };

  onMounted(() => {
    initMap();
    view.value = map.value?.getView();
    zoom.value = view.value?.getZoom();
    zoomCon = view.value?.getZoom()!;
    center.value = view.value?.getCenter();
  });
</script>

<style lang="scss" scoped>
</style>