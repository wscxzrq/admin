<template>
  <div class="h-full w-full relative">
    <div id="map" class="w-full h-[500px]"></div>
    <el-form :model="form" label-width="auto">
      <el-form-item label="测量类型" size="small">
        <el-select v-model="form.type" placeholder="请选择测量类型">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import MapBrowserEvent from 'ol/MapBrowserEvent';
  import Draw, { DrawEvent } from 'ol/interaction/Draw.js';
  import { Vector as VectorSource } from 'ol/source';
  import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
  import { Polygon } from 'ol/geom';
  import { getLength } from 'ol/sphere';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';
  let form = reactive({
    type: 'length', //测量类型
  });
  const options = [
    {
      label: '距离',
      value: 'length',
    },
    {
      label: '面积',
      value: 'area',
    },
  ];
  let map = ref<Map | undefined>();
  // 当前绘制的要素
  let sketch;

  let draw: Draw;
  // 测量工具提示框对象
  let measureTooltipElement: HTMLDivElement;
  // 测量工具中显示的测量值
  let measureTooltip;
  // 加载测量的绘制矢量层
  const source = new VectorSource();
  // 加载测量的绘制矢量层样式
  const vector = new VectorLayer({
    source,
    style: {
      'fill-color': 'rgba(255,255,255,.2)',
      'stroke-color': '#ffcc33',
      'stroke-width': 2,
      'circle-radius': 7,
      'circle-fill-color': '#ffcc33',
    },
  });

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

  onMounted(() => {
    initMap();
    map.value!.on('pointermove', pointerMoveHandler);
    map.value!.addInteraction(draw);
    map.value!.addLayer(vector);

    interface evtInter {
      feature: any;
      coordinate: any;
    }
    let listener;
    draw.on('drawstart', function (evt: any) {
      // 设置当前绘制要素
      sketch = evt.feature;
      console.log('sketch', sketch);
      let tooltipCoord = evt.coordinate;

      listener = sketch.getGeometry().on('change', function (evt: any) {
        const geom = evt.target;
        let output;
        if (geom instanceof Polygon) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerText = output!;
        measureTooltip.setPostion(tooltipCoord);
      });
    });
  });

  // 处理鼠标移动
  const pointerMoveHandler = (evt: MapBrowserEvent<any>) => {
    if (evt.dragging) {
      return;
    }

    let helpMsg = '点击开始绘图';
    if (sketch) {
    }
  };
  // 添加交互
  const addInteraction = () => {
    const type = form.type == 'area' ? 'Polygon' : 'LineString';
    draw = new Draw({
      source: source,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255,255,255,.2)',
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
    });
  };

  //  测量长度输出
  const formatLength = (line: any) => {
    const length = getLength(line);
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + '' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + '' + 'm';
    }
    return output;
  };

  // 创建测量工具提示框
  const createMeasureTooltip = () => {
    if (measureTooltipElement) {
    }
  };
</script>

<style lang="scss" scoped>
</style>