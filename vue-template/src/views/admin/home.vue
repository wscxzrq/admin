<template>
  <div>
    <div class="grid md:grid-cols-4 gap-3 bg-gray-100 cursor-pointer">
      <el-card shadow="hover" :body-style="{pading:'20px'}" v-for="(card,index) of cards" :key="index">
        <template #header>
          <div class="flex justify-between items-center">
            {{card.title}}
            <el-tag size="small" type="danger" effect="dark">月</el-tag>
          </div>
        </template>
  
        <section class="flex mt-3 justify-between items-center">
          <span class="text-3xl"> $29322 </span>
          <i :class="[card.icon,card.iconColor]" class="text-5xl"></i>
        </section>
  
        <section class="text-sm mt-6 flex justify-between items-center">
          {{ card.totalTitle }}
          <span class>{{ card.total }}</span>
        </section>
      </el-card>
    </div>
    <div class="bg-white mt-5 grid md:grid-cols-2 gap-3">
      <el-card :body-style="{pading:'20px'}">
        <template #header>
          <div>用户统计</div>
        </template>
        <div id="echart1" class="h-80 w-full"></div>
      </el-card>
      <el-card :body-style="{pading:'20px'}">
        <template #header>
          <div>销售额</div>
        </template>
        <div id="echart2" class="h-80 w-full"></div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref ,nextTick} from 'vue';
import {echart1,echart2} from './echarts'
interface ICard {
  title: string;
  price: number;
  icon: string;
  iconColor:string
  totalTitle:string
  total:number,
}
const cards = ref<ICard[]> ([
  {
    title: '总人数',
    price: 100,
    icon: 'fas fa-address-card',
    iconColor:'text-violet-500',
    totalTitle:'总人数',
    total:200,
  },
  {
    title: '销售额',
    price: 100,
    icon: 'fas fa-apple-alt',
    iconColor:'text-green-500',
    totalTitle:'总销售额',
    total:200
  },
  {
    title: '订单数',
    price: 100,
    icon: 'fas fa-award',
    iconColor:'text-blue-500',
    totalTitle:'总订单数',
    total:200
  },
  {
    title: '评论数',
    price: 100,
    icon: 'fas fa-baseball-ball',
    iconColor:'text-red-500',
    totalTitle:'总评论',
    total:200
  },
])

nextTick(() => {
  echarts.init(document.getElementById('echart1')).setOption(echart1);
  echarts.init(document.getElementById('echart2')).setOption(echart2);
})
</script>
<style lang="scss" scoped>

</style>