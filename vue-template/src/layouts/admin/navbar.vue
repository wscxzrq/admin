<!-- 面包屑导航 -->
<template>
  <div class="bg-white p-3 px-5 flex justify-between items-center">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">编辑器</el-breadcrumb-item>
      <el-breadcrumb-item>富文本编辑器</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex justify-center items-center relative group cursor-pointer">
      <img src="/images/user.JPG" class="w-8 h-8 rounded-full object-cover " >
      <span class="text-sm text-gray-600 ml-1">Miss.XT</span>
      <section class="group-hover:block absolute top-full bg-white px-3 shadow-sm whitespace-nowrap border rounded-md hidden">
        <div class="flex items-center cursor-pointer border-b py-3">
          <i class="fas fa-ad"></i>
          <span class="text-xs text-gray-600 ml-2">文档资料</span>
        </div>
        <div class="flex items-center cursor-pointer border-b py-3">
          <i class="fas fa-ad"></i>
          <span class="text-xs text-gray-600 ml-2">用户管理</span>
        </div>
        <div class="flex items-center cursor-pointer border-b py-3">
          <i class="fas fa-ad"></i>
          <span class="text-xs text-gray-600 ml-2">会员中心</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>