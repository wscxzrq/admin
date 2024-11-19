<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-[400px] absolute"> </div>
    <div class="absolute top-[420px]">
      <el-form :model="form" label-width="auto">
        <el-form-item label="单位" size="small">
          <el-select v-model="form.units" placeholder="请选择单位" @change="unitsChange">
            <el-option v-for="item in options.units" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="比例尺形式" size="small">
          <el-select v-model="form.type" placeholder="请选择比例尺形式" @change="typeChange">
            <el-option v-for="item in options.type" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div v-if="form.type == 'scalebar'">
          <el-form-item label="设置比例尺的分段数" size="small">
            <input type="range" v-model="form.steps" min="1" max="8" @input="typeChange">
            &nbsp;{{ form.steps }}
          </el-form-item>
          <el-form-item label="显示比例文本" size="small">
            <el-checkbox v-model="form.showScaleText" @change="typeChange" />
          </el-form-item>
          <el-form-item label="是否反转颜色" size="small">
            <el-checkbox v-model="form.invertColors" @change="onInvertColorsChange" />
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { reactive } from 'vue';
  import { ScaleLine } from 'ol/control';
  import { Units } from 'ol/control/ScaleLine';
  import { defaults as defaultControls } from 'ol/control';

  const key = 'c3e13f43d5f380c070aaff0b2920fae8';
  let form = reactive({
    units: 'metric', // 单位
    type: 'scaleline', // 比例尺类型
    steps: 4, // 比例尺分段数
    showScaleText: false, // 显示比例文本
    invertColors: false, // 是否反转颜色
  });
  let map: Map | undefined;
  let control: ScaleLine;
  const options = reactive({
    units: [
      // 角度
      {
        label: '角度',
        value: 'degrees',
      },
      {
        label: '英制单位',
        value: 'imperial',
      },
      {
        label: '美国英制单位',
        value: 'us',
      },
      {
        label: '海里',
        value: 'nautical',
      },
      {
        label: '公制单位',
        value: 'metric',
      },
    ],
    type: [
      {
        value: 'scaleline',
        label: '简单的比例线控件',
      },
      {
        value: 'scalebar',
        label: '使用条形比例尺控件',
      },
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
      controls: defaultControls().extend([scaleControl()]),
    });
  };

  // 单位改变
  const unitsChange = (val: Units | any) => {
    control.setUnits(val as any);
  };

  // 比例尺改变
  const typeChange = () => {
    map!.removeControl(control);
    map!.addControl(scaleControl());
  };
  // 规模控制
  const scaleControl = () => {
    if (form.type == 'scaleline') {
      control = new ScaleLine({
        units: form.units as Units,
      });
    } else {
      control = new ScaleLine({
        units: form.units as Units,
        bar: true,
        steps: form.steps,
        text: form.showScaleText,
        minWidth: 140,
      });
      onInvertColorsChange();
    }
    return control;
  };
  function onInvertColorsChange() {
    // @ts-expect-error
    control.element.classList.toggle('ol-scale-bar-inverted', form.invertColors);
  }
  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
:deep(.ol-scale-bar-inverted .ol-scale-singlebar-even) {
  background-color: var(--ol-background-color);
}

:deep(.ol-scale-bar-inverted .ol-scale-singlebar-odd) {
  background-color: var(--ol-subtle-foreground-color);
}
</style>