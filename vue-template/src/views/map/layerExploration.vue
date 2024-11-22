<template>
  <div id="map" class="h-full w-full absolute"></div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { Map, View } from 'ol';
  import { getRenderPixel } from 'ol/render';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';
  // 天地图影像地图
  const imagery = new TileLayer({
    source: new XYZ({
      url: `http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=${key}`,
      tileSize: 512,
      maxZoom: 22,
    }),
  });
  const imagery2 = new TileLayer({
    source: new XYZ({
      url: `http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=${key}`,
    }),
  });
  // 地图对象
  let map: Map;
  let mousePosition: number[] | null;
  // 探查半径
  let radius = 75;
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
        imagery,
        imagery2,
      ],
      view: new View({
        projection: 'EPSG:4326',
        center: [104.07, 30.67],
        zoom: 12,
      }),
    });

    const container = document.getElementById('map');
    // 获取每次移动的像素位置
    container!.addEventListener('mousemove', function (event) {
      mousePosition = map.getEventPixel(event);
      map.render();
    });

    container!.addEventListener('mouseout', function () {
      mousePosition = null;
      map.render();
    });

    document.addEventListener('keydown', function (evt) {
      if (evt.which === 38) {
        radius = Math.min(radius + 5, 150);
        map.render();
        evt.preventDefault();
      } else if (evt.which === 40) {
        radius = Math.max(radius - 5, 25);
        map.render();
        evt.preventDefault();
      }
    });

    // 动态更新 mousePosition
    map.on('pointermove', function (event) {
      mousePosition = map.getEventCoordinate(event.originalEvent);
    });
  };

  // 在图层渲染之后触发
  imagery.on('prerender', function (event) {
    const ctx = event.context as CanvasRenderingContext2D;
    ctx.save();
    ctx.beginPath();
    if (mousePosition) {
      // 只显示鼠标周围的圆圈
      const pixel = getRenderPixel(event, mousePosition);
      const offset = getRenderPixel(event, [mousePosition[0] + radius, mousePosition[1]]);
      // 根据地理半径 radius，转换为像素渲染距离
      const canvasRadius = Math.sqrt(Math.pow(offset[0] - pixel[0], 2) + Math.pow(offset[1] - pixel[1], 2));
      // 利用 arc 方法绘制圆形路径，使用 clip 限制绘图区域。
      ctx.arc(pixel[0], pixel[1], canvasRadius, 0, 2 * Math.PI);
      // 鼠标可视化范围
      ctx.lineWidth = (5 * canvasRadius) / radius;
      // 给圆圈添加透明描边，视觉上突出显示鼠标周围的区域
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.stroke();
    }
    ctx.clip();
  });

  // 在图层渲染之前触发
  imagery.on('postrender', function (event) {
    const ctx = event.context as CanvasRenderingContext2D;
    // 恢复 Canvas 绘图上下文状态，清除剪切效果
    ctx.restore();
  });

  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
</style>