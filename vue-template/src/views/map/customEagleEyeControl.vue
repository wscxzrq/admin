<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-[400px] absolute"></div>
    <div class="absolute top-[420px]">
      <el-form :model="form" label-width="auto">
        <el-form-item label="随视图旋转" size="small">
          <el-checkbox v-model="form.rotateWithView" @change="rotateWithViewChange"></el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { defaults as defaultControls, OverviewMap } from 'ol/control';
  import { reactive } from 'vue';
  import { CheckboxValueType } from 'element-plus';
  import { DragRotateAndZoom, defaults as defaultInteractions } from 'ol/interaction.js';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';
  let form = reactive({
    rotateWithView: false,
  });
  let map: Map;
  const overviewMapControl = new OverviewMap({
    className: 'ol-overviewmap ol-custom-overviewmap',
    layers: [
      new TileLayer({
        source: new XYZ({
          url: `http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${key}`,
        }),
      }),
    ],
    // 鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
    collapseLabel: '\u00BB',
    // 鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
    label: '\u00BB',
    // 初始为展开显示方式
    collapsed: false,
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
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [104.07, 30.67],
        zoom: 12,
      }),
      controls: defaultControls().extend([overviewMapControl]),
      /**
       * 表示地图的交互配置项，用于定义用户可以如何与地图交互（例如拖动、缩放、旋转等）。
       * new DragRotateAndZoom()：允许用户按住 Shift 键并拖动鼠标旋转和缩放地图。
       */
      interactions: defaultInteractions().extend([new DragRotateAndZoom()]),
    });
  };

  const rotateWithViewChange = (val: boolean | CheckboxValueType) => {
    overviewMapControl.setRotateWithView(val as boolean);
  };
  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
:deep(.ol-custom-overviewmap, .ol-custom-overviewmap.ol-uncollapsible) {
  bottom: auto;
  left: auto;
  right: 0;
  top: 0;
}
:deep(.ol-custom-overviewmap:not(.ol-collapsed)) {
  border: 1px solid black;
}
:deep(.ol-custom-overviewmap .ol-overviewmap-map) {
  border: none;
  width: 300px;
}
:deep(.ol-custom-overviewmap .ol-overviewmap-box) {
  border: 2px solid red;
}
:deep(.ol-custom-overviewmap:not(.ol-collapsed) button) {
  bottom: auto;
  left: auto;
  right: 1px;
  top: 1px;
}
:deep(.ol-rotate) {
  top: 170px;
  right: 0;
}
</style>