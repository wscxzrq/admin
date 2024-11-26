<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-[500px]"></div>
    <el-form :model="form" class="mt-10" :inline="true">
      <el-form-item label="测量类型" size="small">
        <el-select v-model="form.type" placeholder="请选择测量类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展示片段长度（中点）">
        <el-checkbox v-model="form.segments"></el-checkbox>
      </el-form-item>
      <el-form-item label="清空上一次测量结果">
        <el-checkbox v-model="form.clear"></el-checkbox>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { LineString, Point, Polygon, Geometry } from 'ol/geom.js';
  import { key, formatArea, formatLength } from './index';
  import { Vector as VectorSource } from 'ol/source.js';
  import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style';
  import Feature from 'ol/Feature.js';
  import { Draw, Modify } from 'ol/interaction.js';

  type DrawType = 'Polygon' | 'LineString' | 'Point';
  let form = reactive({
    type: 'LineString', //测量类型
    segments: false, // 展示片段长度（中点）
    clear: false, // 清空上一次测量结果
  });
  const options = [
    {
      label: '距离',
      value: 'LineString',
    },
    {
      label: '面积',
      value: 'Polygon',
    },
  ];
  // 基础样式
  let style = ref(
    new Style({
      fill: new Fill({
        color: 'rgba(255,255,255.2)',
      }),
      stroke: new Stroke({
        color: 'rgba(0,0,0,.5)',
        lineDash: [10, 10],
        width: 2,
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0,0,0,.7)',
        }),
        fill: new Fill({
          color: 'rgba(255,255,255,.2)',
        }),
      }),
    }),
  );
  let labelStyle = ref();
  let tipStyle = ref();
  // 修改点的样式
  let modifyStyle = ref<any>(
    new Style({
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0,0,0,.7)',
        }),
        fill: new Fill({
          color: 'rgba(0,0,0,.4)',
        }),
      }),
      text: new Text({
        text: '拖动以修改',
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255,255,255,1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0,0,0,.7)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
      }),
    }),
  );
  let segmentStyle = ref();
  const segmentStyles = ref([segmentStyle]);
  let map = ref<Map>();
  // 加载绘制的矢量图层
  let source = ref<any>(new VectorSource());
  // 创建 Modify 交互，用于修改矢量要素
  let modify = ref<any>(new Modify({ source: source.value, style: modifyStyle.value }));
  // 提示点
  let tipPoint = ref();
  const vector = ref<any>(
    new VectorSource({
      // source:source.value,
      // style:function(feature) {
      //   return
      // }
    }),
  );
  const initMap = () => {
    map.value = new Map({
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
        zoom: 15,
      }),
    });
  };

  function styleFunction(feature: Feature<Geometry>, segaments: boolean, drawType?: DrawType, tip?: string): Style[] {
    const styles = [style.value];
    const geometry = feature.getGeometry();
  }

  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
</style>