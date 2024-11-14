<template>
    addLayer方式
    <div id="map1" class="h-[100%] w-[100%]"></div>
</template>

<script lang="ts" setup>
import 'ol/css'
import { Map, View } from 'ol';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
const key = 'c3e13f43d5f380c070aaff0b2920fae8';

const initMap = () => {
    const map = new Map({
        target: 'map1',
        layers: [],
        view: new View({
            projection: "EPSG:4326",
            center: [104.07, 30.67],
            zoom: 12
        })
    })

    const tileLayer1 = new TileLayer({
        source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=${key}`,
            wrapX: false
        })
    })

    const tileLayer2 = new TileLayer({
        source: new XYZ({
            crossOrigin: 'anomymous',
            url: `http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=${key}`,
            wrapX: false
        })
    })

    map.addLayer(tileLayer1)
    map.addLayer(tileLayer2)

}

onMounted(() => {
    initMap()
})
</script>

<style lang="scss" scoped></style>