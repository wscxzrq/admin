<!-- 面包屑导航 -->
<template>
  <div class="bg-white p-3 px-5 flex justify-between items-center">
    <div class="flex items-center ">
      <div @click="menuService.toggleState">
        <i class="fas fa-align-right mr-2 text-gray-700 cursor-pointer" v-if="!menuService.isCollapse.value"></i>
        <i class="fas fa-align-left mr-2 text-gray-700 cursor-pointer" v-else></i>
      </div>
      <Breadcrumb class="hidden md:block"/>
    </div>
    <div class="flex justify-center items-center relative cursor-pointer">
      <Notification class="mr-5"/>
      <el-icon class="mr-2" @click="fullScreen">
        <FullScreen />
      </el-icon>
      <div class="group">
       <div class="flex justify-center items-center">
          <img :src="userStore().info?.avatar" class="w-8 h-8 rounded-full object-cover " >
          <span class="text-sm text-gray-600 ml-1">
            {{ userStore().info?.name }} 
          </span>
       </div>
        <section class="group-hover:block absolute right-0 top-full bg-white px-3 shadow-sm whitespace-nowrap border rounded-md hidden z-10">
          <div class="flex items-center cursor-pointer border-b py-3">
            <i class="fas fa-folder-open"></i>
            <span class="text-xs text-gray-600 ml-2">文档资料</span>
          </div>
          <div class="flex items-center cursor-pointer border-b py-3">
            <i class="fas fa-home"></i>
            <span class="text-xs text-gray-600 ml-2">网站首页</span>
          </div>
          <div class="flex items-center cursor-pointer border-b py-3" @click="utils.user.logout()">
            <i class="fas fa-sign-out-alt"></i>
            <span class="text-xs text-gray-600 ml-2">退出登录</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userStore from "@/store/userStore";
import utils from '@/utils'
import menuService from '@/composables/menu'
import Notification from "@/components/notification.vue";
import Breadcrumb from '@/components/breadcrumb.vue';
/**
 * 全屏
 */
const fullScreen = () => {
  document.documentElement.requestFullscreen();
}
</script>

<style lang="scss" scoped>
</style>