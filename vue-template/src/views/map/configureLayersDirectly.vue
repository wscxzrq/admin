
<template>
  <div id="map" class="h-[100%] w-[100%] absolute"></div>
</template>

<script lang="ts" setup>
  import { Map, View } from 'ol';
  import * as olProj from 'ol/proj';
  import TileLayer from 'ol/layer/Tile';
  import XYZ from 'ol/source/XYZ';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';

  const initMap = () => {
    new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
            // 禁用水平循环，即瓦片在水平方向不会无限滚动
            wrapX: false,
          }),
        }),
        new TileLayer({
          source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${key}`,
            // 禁用水平循环，即瓦片在水平方向不会无限滚动
            wrapX: false,
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [104.07, 30.67],
        zoom: 12,
      }),
    });
  };

  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
</style>