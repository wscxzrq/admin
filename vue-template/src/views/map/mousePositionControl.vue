<template>
  <div class="h-[100%] w-[100%] relative">
    <div id="map" class="h-[70%] w-[100%] absolute">
      <div class="absolute -bottom-[8rem]">
        <div ref="mousePosition"></div>
        <el-form :model="form" label-width="auto">
          <el-form-item label="投影" size="small">
            <el-select v-model="form.projection" placeholder="请选择投影方式" @change="handleChange">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="精度">
            <el-input-number v-model="form.precision" :min="0" :max="12" @change="precisionChange" />
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { defaults as defaultControls } from 'ol/control';
  import { Map, View } from 'ol';
  import MousePosition from 'ol/control/MousePosition.js';
  import { createStringXY } from 'ol/coordinate';
  import { reactive } from 'vue';

  const key = 'c3e13f43d5f380c070aaff0b2920fae8';

  const mousePosition = ref(null);

  const options = ref([
    {
      label: 'EPSG:4326',
      value: 'EPSG:4326',
    },
    {
      label: 'EPSG:3857',
      value: 'EPSG:3857',
    },
  ]);

  let form = reactive({
    // 投影方式
    projection: 'EPSG:4326',
    // 精度
    precision: 4,
  });

  let mousePositionControl = ref<MousePosition>();

  const initMap = () => {
    mousePositionControl.value = new MousePosition({
      coordinateFormat: createStringXY(4),
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: mousePosition.value!,
    });

    new Map({
      target: 'map',
      controls: defaultControls().extend([mousePositionControl.value]),
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
    });
  };

  // 投影改变
  const handleChange = (value: string) => {
    if (mousePositionControl.value) mousePositionControl.value.setProjection(value);
  };

  // 精度改变
  const precisionChange = (val: number | undefined) => {
    if (mousePositionControl.value) {
      const format = createStringXY(val);
      mousePositionControl.value.setCoordinateFormat(format);
    }
  };
  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
</style>