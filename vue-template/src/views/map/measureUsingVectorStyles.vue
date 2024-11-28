<template>
  <div class="w-full h-full relative">
    <div id="map" class="w-full h-[500px]"></div>
    <el-form :model="form" class="mt-10" :inline="true">
      <el-form-item label="测量类型" size="small">
        <el-select v-model="form.drawType" placeholder="请选择测量类型" @change="drawTypeChange">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展示片段长度（中点）">
        <el-checkbox v-model="form.segments" @change="segmentsChange"></el-checkbox>
      </el-form-item>
      <el-form-item label="清空上一次测量结果">
        <el-checkbox v-model="form.clearPrevious"></el-checkbox>
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
  import { Draw, Modify } from 'ol/interaction.js';
  import { Coordinate } from 'ol/coordinate';
  import VectorLayer from 'ol/layer/Vector';

  let form = reactive({
    drawType: 'LineString' as 'Polygon' | 'LineString' | undefined, // 绘图类型
    segments: false, // 是否显示线段长度（中点）
    clearPrevious: false, // 是否清除之前的图形
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
  // 地图对象引用
  let map = ref<Map | null>(null);
  // 矢量数据源
  let source = ref<any>(new VectorSource());
  // 绘图交互实例
  let draw = ref<Draw | null>(null);
  // 鼠标提示位置
  let tipPoint: Point | null = null;
  // 基础样式
  const style = new Style({
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
  });
  // 标签样式
  const labelStyle = new Style({
    text: new Text({
      font: '14px Calibri,sans-serif',
      fill: new Fill({ color: 'rgba(255,255,255,.2)' }),
      backgroundFill: new Fill({ color: 'rgba(0,0,0,.7)' }),
      padding: [3, 3, 3, 3],
      textBaseline: 'bottom',
      offsetY: -15,
    }),
    image: new RegularShape({
      radius: 8,
      points: 3,
      angle: Math.PI,
      displacement: [0, 0],
      fill: new Fill({
        color: 'rgba(0,0,0,.7)',
      }),
    }),
  });
  // 鼠标提示样式
  const tipStyle = new Style({
    text: new Text({
      font: '12px Calibri,sans-serif',
      fill: new Fill({ color: 'rgba(255,255,255,1)' }),
      backgroundFill: new Fill({ color: 'rgba(0,0,0,.4)' }),
      padding: [2, 2, 2, 2],
      textAlign: 'left',
      offsetX: 15,
    }),
  });
  // 修改交互样式
  const modifyStyle = ref<any>(
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
          color: 'rgba(255, 255, 255, 1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0, 0, 0, 0.7)',
        }),
        padding: [2, 2, 2, 2],
        textAlign: 'left',
        offsetX: 15,
      }),
    }),
  );
  //  线段样式
  const segmentStyle = ref<any>(
    new Style({
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({
          color: 'rgba(255,255,255,1)',
        }),
        backgroundFill: new Fill({
          color: 'rgba(0,0,0,.4)',
        }),
        padding: [2, 2, 2, 2],
        textBaseline: 'bottom',
        offsetY: -12,
      }),
      // 创建一个规则几何图形
      image: new RegularShape({
        // 半径，如果是三角形，表示顶点到中心的距离
        radius: 6,
        // 图形的边数
        points: 3,
        // 图形的旋转角度
        angle: Math.PI,
        // 定义图形中心相对于原点的偏移量 表示中心向下偏移 8 像素
        displacement: [0, 8],
        fill: new Fill({
          color: 'rgba(0,0,0,.4)',
        }),
      }),
    }),
  );
  const segmentStyles = ref<any[]>([segmentStyle.value]);
  // 修改交互实例
  let modify = ref<Modify>();
  // 绘制图层
  const vector = ref<any>(
    new VectorLayer({
      source: source.value,
      style: function (feature: any) {
        return styleFunction(feature, form.segments);
      },
    }),
  );
  /**
   * 动态为地图上的要素设置样式
   * @param feature 要素类型
   * @param segaments 是否显示分段信息
   * @param drawType 绘制状态
   * @param tip 提示文本
   */
  function styleFunction(
    feature: any,
    segaments: boolean,
    drawType?: 'Polygon' | 'LineString' | undefined,
    tip?: string,
  ): Style[] {
    // 初始化样式数组
    const styles = [style];
    // 获取当前要素的几何信息
    const geometry = feature.getGeometry();
    // 获取当前要素的几何类型
    const type = geometry?.getType();
    let point: Point | undefined;
    let label: string | undefined;
    let line: LineString | undefined;
    // 判断当前要素是否需要处理
    if (!drawType || drawType === type) {
      // 如果是多边形
      if (type === 'Polygon') {
        // 多边形的内点，用于显示面积标注
        point = (geometry as Polygon)?.getInteriorPoint();
        // 多边形的面积（通过 formatArea 函数计算）
        label = formatArea(geometry as Polygon, '\xB2');
        // 由多边形的外环坐标生成线（用于分段处理）。
        line = new LineString((geometry as Polygon).getCoordinates()[0]);
      } else if (type === 'LineString') {
        // 如果是线

        // 线的终点，用于显示长度标注
        point = new Point((geometry as LineString).getLastCoordinate());
        // 线的总长度（通过 formatLength 函数计算）。
        label = formatLength(geometry as LineString);
        // 当前线本身
        line = geometry as LineString;
      }
    }
    // 如果需要显示分段信息
    if (segaments && line) {
      let count = 0;
      /**
       * 遍历线的每段
       * @param a 线的起点
       * @param b 线的中点
       */
      line.forEachSegment((a: Coordinate, b: Coordinate) => {
        // 获取线段
        const segment = new LineString([a, b]);
        // 获取每段的长度
        const label = formatLength(segment);

        if (segmentStyles.value.length - 1 < count) {
          segmentStyles.value.push(segmentStyle.value.clone());
        }
        // 计算线段的中点坐标并创建一个新的 Point 对象
        const segmentPoint = new Point(segment.getCoordinateAt(0.5));
        segmentStyles.value[count].setGeometry(segmentPoint);
        segmentStyles.value[count].getText().setText(label);
        styles.push(segmentStyles.value[count]);
        count++;
      });
    }

    // 显示总标注
    if (label) {
      labelStyle.setGeometry(point!);
      labelStyle.getText()?.setText(label);
      styles.push(labelStyle);
    }

    if (tip && tip === 'Point' && !modify.value!.getOverlay().getSource()?.getFeatures().length) {
      tipPoint = geometry as Point;
      tipStyle.getText()?.setText(tip);
      styles.push(tipStyle);
    }

    return styles;
  }

  // 初始化地图
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
        vector.value,
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [104.07, 30.67],
        zoom: 15,
      }),
    });

    modify.value = new Modify({ source: source.value, style: modifyStyle.value });
    map.value.addInteraction(modify.value);
  };

  // 添加绘图交互
  const addInteraction = () => {
    const idleTip = '点击开始测量';
    const activeTip = `单击以继续绘制 ${form.drawType === 'Polygon' ? '多边形' : '线段'}`;

    let tip = idleTip;
    draw.value = new Draw({
      source: source.value,
      type: form.drawType!,
      style: feature => styleFunction(feature, form.segments, form.drawType, tip),
    });

    draw.value.on('drawstart', () => {
      if (form.clearPrevious) {
        source.value.clear();
      }
      modify.value!.setActive(false);
      tip = activeTip;
    });

    draw.value.on('drawend', () => {
      modifyStyle.value.setGeometry(tipPoint);
      modify.value!.setActive(true);
      map.value?.once('pointermove', () => {
        modifyStyle.value.setGeometry();
      });
      tip = idleTip;
    });

    modify.value!.setActive(true);
    map.value?.addInteraction(draw.value as Draw);
  };

  // 展示片段长度（中点）
  const segmentsChange = () => {
    // 触发重绘
    vector.value.changed();
    // 触发重新计算
    draw.value?.getOverlay().changed();
  };
  // 切换绘制类型
  const drawTypeChange = () => {
    map.value?.removeInteraction(draw.value as Draw);
    addInteraction();
  };
  onMounted(() => {
    initMap();
    addInteraction();
  });
</script>

<style lang="scss" scoped>
</style>