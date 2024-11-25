<template>
  <div class="h-full w-full relative">
    <div id="map" class="w-full h-[400px]"></div>
    <el-button-group class="mt-4">
      <el-button type="primary" @click="rotateClockwise">顺时针旋转 90度</el-button>
      <el-button type="primary" @click="counterclockwise">逆时针旋转 90度</el-button>
      <el-button type="primary" @click="panToShanghai">平移到上海</el-button>
      <el-button type="primary" @click="stretchJumpToBeijing">拉伸跳到北京</el-button>
      <el-button type="primary" @click="bounceToNanjing">弹跳到南京</el-button>
      <el-button type="primary" @click="rotateToZhangjiakou">旋转到张家口</el-button>
      <el-button type="primary" @click="flyToGuangzhou">飞行到广州</el-button>
      <el-button type="primary" @click="rotateAroundTheCurrent">围绕当前旋转</el-button>
      <el-button type="primary" @click="travel">旅行</el-button>

    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
  import 'ol/ol.css';
  import { Tile as TileLayer } from 'ol/layer';
  import XYZ from 'ol/source/XYZ';
  import { defaults as defaultControls } from 'ol/control';
  import { Map, View } from 'ol';
  import { easeIn, easeOut } from 'ol/easing.js';
  const key = 'c3e13f43d5f380c070aaff0b2920fae8';
  const shanghai: number[] = [121.4737, 31.2304];
  const beijing: number[] = [116.3974, 39.9087];
  const nanjing: number[] = [118.7969, 32.0603];
  const zhangjiakou: number[] = [114.8938, 40.7662];
  const guangzhou: number[] = [113.2644, 23.1291];
  const sichuan: number[] = [104.07, 30.67];
  let map: Map | undefined;
  let view: View = new View({
    projection: 'EPSG:4326',
    center: sichuan,
    zoom: 12,
  });

  const initMap = () => {
    map = new Map({
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
      view,
    });
  };

  // 顺时针旋转
  const rotateClockwise = () => {
    view.animate({
      rotation: view.getRotation() + Math.PI / 2,
    });
  };
  // 逆时针旋转
  const counterclockwise = () => {
    view.animate({
      rotation: view.getRotation() - Math.PI / 2,
    });
  };
  // 平移到上海
  const panToShanghai = () => {
    view.animate({
      center: shanghai,
      duration: 2000,
    });
  };
  // 拉伸跳到北京
  const stretchJumpToBeijing = () => {
    // 拉伸跳动画
    function elastic(t: number) {
      return Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1;
    }
    view.animate({
      center: beijing,
      duration: 2000,
      easing: elastic,
    });
  };
  // 弹跳到南京
  const bounceToNanjing = () => {
    function bounce(t: number) {
      const s = 7.5625;
      const p = 2.75;
      let l;
      if (t < 1 / p) {
        l = s * t * t;
      } else {
        if (t < 2 / p) {
          t -= 1.5 / p;
          l = s * t * t + 0.75;
        } else {
          if (t < 2.5 / p) {
            t -= 2.25 / p;
            l = s * t * t + 0.9375;
          } else {
            t -= 2.625 / p;
            l = s * t * t + 0.984375;
          }
        }
      }
      return l;
    }
    view.animate({
      center: nanjing,
      duration: 2000,
      easing: bounce,
    });
  };
  // 旋转到张家口
  const rotateToZhangjiakou = () => {
    const center = view.getCenter()!;
    view.animate(
      {
        center: [center[0] + (zhangjiakou[0] - center[0]) / 2, center[1] + (zhangjiakou[1] - center[1]) / 2],
        rotation: Math.PI,
        easing: easeIn,
      },
      {
        center: zhangjiakou,
        rotation: 2 * Math.PI,
        easing: easeOut,
      },
    );
  };
  // 飞行到广州
  const flyToGuangzhou = () => {
    flyTo(guangzhou, function () {});
  };
  // 围绕当前旋转
  const rotateAroundTheCurrent = () => {
    const rotation = view.getRotation();
    view.animate(
      {
        rotation: rotation + Math.PI,
        anchor: sichuan,
        easing: easeIn,
      },
      {
        rotation: rotation + 2 * Math.PI,
        anchor: sichuan,
        easing: easeOut,
      },
    );
  };
  // 旅行
  const travel = () => {
    const locations = [shanghai, beijing, nanjing, zhangjiakou, guangzhou];
    let index = -1;
    function next(more: boolean) {
      if (more) {
        ++index;
        if (index < locations.length) {
          const delay = index === 0 ? 0 : 750;
          setTimeout(function () {
            flyTo(locations[index], next);
          }, delay);
        } else {
          alert('Tour complete');
        }
      } else {
        alert('Tour cancelled');
      }
    }
    next(true);
  };
  function flyTo(location: number[], done: Function) {
    const duration = 2000;
    const zoom = view.getZoom()!;
    let parts = 2;
    let called = false;
    function callback(complete: boolean) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate(
      {
        center: location,
        duration: duration,
      },
      callback,
    );
    view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2,
      },
      {
        zoom: zoom,
        duration: duration / 2,
      },
      callback,
    );
  }
  onMounted(() => {
    initMap();
  });
</script>

<style lang="scss" scoped>
</style>