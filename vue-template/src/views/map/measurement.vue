<template>
  <div class="h-full w-full relative">
    <div id="map" class="w-full h-[500px]"></div>
    <el-form :model="form" label-width="auto">
      <el-form-item label="测量类型" size="small">
        <el-select v-model="form.type" placeholder="请选择测量类型" @change="typeChange">
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
  import { Map, Overlay, View } from 'ol';
  import MapBrowserEvent from 'ol/MapBrowserEvent';
  import Draw, { DrawEvent } from 'ol/interaction/Draw.js';
  import { Source, Vector as VectorSource } from 'ol/source';
  import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
  import { LineString, Polygon } from 'ol/geom';
  import { getLength, getArea } from 'ol/sphere';
  import Feature from 'ol/render/Feature';
  import { unByKey } from 'ol/Observable.js';
  import { EventsKey } from 'ol/events';

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
  let sketch = ref<any>();

  let draw = ref<Draw>();
  // 测量工具提示框对象
  let measureTooltipElement: HTMLDivElement | null;
  // 测量工具中显示的测量值
  let measureTooltip: Overlay;
  const continuePolygonMsg = '单击继续绘制多边形';
  const continueLineMsg = '单击以继续绘制线条';
  // 帮助工具提示元素
  let helpTooltipElement: HTMLDivElement | null;
  /**
   * 覆盖以显示帮助消息
   * @type {Overlay}
   */
  let helpTooltip: Overlay;
  // 加载测量的绘制矢量层
  let source = ref();
  // 加载测量的绘制矢量层样式
  const vector = ref();
  // 处理鼠标移动
  const pointerMoveHandler = (evt: MapBrowserEvent<any>) => {
    if (evt.dragging) {
      return;
    }

    let helpMsg = '点击开始绘图';
    if (sketch.value) {
      const geom = sketch.value.getGeometry;
      // 如果绘制的是多边形
      if (geom instanceof Polygon) {
        helpMsg = continuePolygonMsg;
      } else if (geom instanceof LineString) {
        // 如果绘制的是线段
        helpMsg = continueLineMsg;
      }
      helpTooltipElement!.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);
      helpTooltipElement?.classList.remove('hidden');
    }
  };

  onMounted(() => {
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

    source.value = new VectorSource();
    // 绘制出来的图层
    vector.value = new VectorLayer({
      source: source.value,
      style: {
        'fill-color': 'rgba(255,255,255,.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33',
      },
    });

    map.value.addLayer(vector.value);

    map.value!.on('pointermove', pointerMoveHandler);
    map.value?.getViewport().addEventListener('mouseout', () => {
      helpTooltipElement?.classList.add('hidden');
    });
    addInteraction(); //调用加载绘制交互控件方法，添加绘图进行测量
  });

  // 添加交互
  const addInteraction = () => {
    const type = form.type == 'area' ? 'Polygon' : 'LineString';
    draw.value = new Draw({
      source: source.value,
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
    map.value!.addInteraction(draw.value);

    createMeasureTooltip(); //创建测量工具提示框
    createHelpTooltip(); //创建帮助提示框

    let listener: EventsKey | EventsKey[];

    draw.value.on('drawstart', function (evt: any) {
      // 设置当前绘制要素
      sketch.value = evt.feature as Feature;
      let tooltipCoord = evt.coordinate;

      // 绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
      listener = (sketch.value.getGeometry() as unknown as LineString).on('change', (evt: any) => {
        const geom = evt.target;
        let output;
        if (geom instanceof Polygon) {
          output = formatArea(geom);
          tooltipCoord = geom.getLastCoordinate();
        } else if (geom instanceof LineString) {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        // 将测量值设置到测量工具提示框中显示
        measureTooltipElement!.innerHTML = output!;
        // 设置测量工具提示框的显示位置
        measureTooltip.setPosition(tooltipCoord);
      });
    });

    draw.value.on('drawend', (evt: any) => {
      measureTooltipElement!.className = 'ol-tooltip ol-tooltip-static';
      measureTooltip.setOffset([0, -7]);
      sketch.value = null;
      measureTooltipElement = null;
      createMeasureTooltip();
      unByKey(listener);
    });
  };

  /**
   * 测量长度输出
   * @param line
   */
  const formatLength = (line: LineString) => {
    const transformedLine = line.clone().transform('EPSG:4326', 'EPSG:3857');
    const length = transformedLine.getLength();
    let output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + '' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + '' + 'm';
    }
    return output;
  };

  const formatArea = (polygon: Polygon) => {
    const transformedLine = polygon.clone().transform('EPSG:4326', 'EPSG:3857');
    const area = transformedLine.getArea();
    let output;
    if (area > 10000) {
      output = (Math.round(area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
  };
  /**
   * 创建测量工具提示框
   */
  const createMeasureTooltip = () => {
    if (measureTooltipElement) {
      measureTooltipElement.parentNode?.removeChild(measureTooltipElement);
    }

    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      // 是否停止事件传播
      stopEvent: false,
      // 覆盖物的 DOM 元素是否插入到目标容器的开头
      insertFirst: false,
    });
    map.value?.addOverlay(measureTooltip);
  };

  /**
   * 创建新的帮助工具提示
   */
  const createHelpTooltip = () => {
    if (helpTooltipElement) {
      helpTooltipElement.parentNode?.removeChild(helpTooltipElement);
    }

    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });
    map.value?.addOverlay(helpTooltip);
  };

  /**
   * 选择器改变事件
   */
  const typeChange = () => {
    map.value?.removeInteraction(draw.value!);
    addInteraction();
  };
</script>

<style lang="scss">
.ol-tooltip {
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  color: white;
  padding: 4px 8px;
  opacity: 0.7;
  white-space: nowrap;
  font-size: 12px;
  cursor: default;
  user-select: none;
}
.ol-tooltip-measure {
  opacity: 1;
  font-weight: bold;
}
.ol-tooltip-static {
  background-color: #ffcc33;
  color: black;
  border: 1px solid white;
}
.ol-tooltip-measure:before,
.ol-tooltip-static:before {
  border-top: 6px solid rgba(0, 0, 0, 0.5);
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
  content: '';
  position: absolute;
  bottom: -6px;
  margin-left: -7px;
  left: 50%;
}
.ol-tooltip-static:before {
  border-top-color: #ffcc33;
}
</style>