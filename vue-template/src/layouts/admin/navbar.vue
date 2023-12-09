<!-- 面包屑导航 -->
<template>
  <div class="bg-white p-3 px-5 flex justify-between items-center">
    <div class="flex items-center ">
      <div @click="menuService.toggleState">
        <i class="fas fa-align-right mr-2 text-gray-700 cursor-pointer" v-if="!menuService.isCollapse.value"></i>
        <i class="fas fa-align-left mr-2 text-gray-700 cursor-pointer" v-else></i>
      </div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">编辑器</el-breadcrumb-item>
        <el-breadcrumb-item>富文本编辑器</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="flex justify-center items-center relative group cursor-pointer">
      <img :src="userStore.info?.avatar" class="w-8 h-8 rounded-full object-cover " >
      <span class="text-sm text-gray-600 ml-1">
        {{ userStore.info?.name }} 
      </span>
      <section class="group-hover:block absolute top-full bg-white px-3 shadow-sm whitespace-nowrap border rounded-md hidden">
        <div class="flex items-center cursor-pointer border-b py-3">
          <i class="fas fa-folder-open"></i>
          <span class="text-xs text-gray-600 ml-2">文档资料</span>
        </div>
        <div class="flex items-center cursor-pointer border-b py-3">
          <i class="fas fa-home"></i>
          <span class="text-xs text-gray-600 ml-2">网站首页</span>
        </div>
        <div class="flex items-center cursor-pointer border-b py-3" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          <span class="text-xs text-gray-600 ml-2">退出登录</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { user } from "@/store/userStore";
import utils from '@/utils'
import menuService from '@/composables/menu'
const userStore = user();
const logout = () => {
  utils.user.logout();
}
</script>

<style lang="scss" scoped>
</style>