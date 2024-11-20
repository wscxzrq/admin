<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-[400px]"></div>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as Tilelayers } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { defaults as defaultControls, FullScreen } from 'ol/control';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';
  let map: Map;
  const initMap = () => {
    new Map({
      target: 'map',
      layers: [
        new Tilelayers({
          source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
            wrapX: false,
          }),
        }),
        new Tilelayers({
          source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${key}`,
            wrapX: false,
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [104.07, 30.67],
        zoom: 12,
      }),
      controls: defaultControls().extend([new FullScreen()]),
    });
  };

  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
:deep(#map:-webkit-full-screen) {
  height: 100%;
  margin: 0;
}
:deep(#map:fullscreen) {
  height: 100%;
}
:deep(.ol-rotate) {
  top: 3em;
}
</style>