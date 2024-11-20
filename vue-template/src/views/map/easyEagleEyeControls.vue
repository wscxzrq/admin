<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-[400px] absolute"></div>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { defaults as defaultControls, OverviewMap } from 'ol/control';
  let map: Map | undefined;
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';

  const overviewMapControl = new OverviewMap({
    layers: [
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
    ],
  });
  const initMap = () => {
    map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
            wrapX: false,
          }),
        }),
        new TileLayer({
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
      controls: defaultControls().extend([overviewMapControl]),
    });
  };
  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
</style>