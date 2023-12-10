<template>
  <!-- 面包屑导航 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <template v-if="route?.matched.length">
      <el-breadcrumb-item v-for="(item,index) in route.matched" :key="index" :to="{ path: item.path }">{{ item.meta.menu?.title }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import menuService from '@/composables/menu';

const route = menuService.route.value;
</script>

<style lang="scss" scoped>

</style>