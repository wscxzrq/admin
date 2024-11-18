<template>
  <div id="map"></div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { defaults as defaultControls, ZoomSlider, ZoomToExtent } from 'ol/control';
  import { Map, View } from 'ol';

  const key = 'c3e13f43d5f380c070aaff0b2920fae8';

  const initMap = () => {
    let map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
            // 禁用水平循环，即瓦片在水平方向不会无限滚动
            wrapX: true,
          }),
        }),
        new TileLayer({
          source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${key}`,
            // 禁用水平循环，即瓦片在水平方向不会无限滚动
            wrapX: true,
          }),
        }),
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [104.07, 30.67],
        zoom: 12,
      }),
      controls: defaultControls({
        zoom: true,
        attribution: false,
        rotate: false,
      }),
    });
    var zoomslider = new ZoomSlider();
    //实例化zoomToExtent控件并加载到地图容器中
    var zoomToExtent = new ZoomToExtent({
      extent: [813079.7791264898, 5929220.284081122, 848966.9639063801, 5936863.986909639],
    });
    map.addControl(zoomslider);

    map.addControl(zoomToExtent);
  };

  onMounted(() => {
    initMap();
  });
</script>

<style>
#map {
  width: 100%;
  height: 95%;
  position: absolute;
}
/* 缩放滑块控件ZoomSlider的样式，放置到缩放按钮之间实现导航条功能*/
#map .ol-zoom .ol-zoom-out {
  margin-top: 204px;
}

#map .ol-zoomslider {
  background-color: transparent;
  top: 2.3em;
}

#map .ol-touch .ol-zoom .ol-zoom-out {
  margin-top: 212px;
}

#map .ol-touch .ol-zoomslider {
  top: 2.75em;
}

#map .ol-zoom-in .ol.has-tooltip:hover[role='tooltip'],
#map .ol-zoom-in .ol-has-tooltip:focus[role='tooltip'] {
  top: 3px;
}

#map .ol-zoom-out .ol-has-tooltip:hover[role='tooltip'],
#map .ol-zoon-out .ol-has-out-tooltip:focus[role='tooltip'] {
  top: 232px;
}

#map .ol-zoom-extent {
  top: 280px;
}
</style>