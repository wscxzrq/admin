
<template></template>

<script lang="ts" setup>
import { Map, View } from 'ol';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
const key = 'c3e13f43d5f380c070aaff0b2920fae8';
interface props {
  /** 矢量地图地址 */
  vectorUrl: string;
  /** 矢量注记图层 */
  vectorMarketUrl: string;
}
const props = withDefaults(defineProps<props>(), {
  vectorUrl: '',
  vectorMarketUrl: '',
});
// 初始化地图
const initMap = () => {
    
};
</script>

<style lang="scss" scoped>
</style>