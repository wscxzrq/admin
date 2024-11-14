<!-- 面包屑导航 -->
<template>
  <div class="bg-white p-3 px-5 flex justify-between items-center">
    <div class="flex items-center ">
      <div @click="menuService.toggleState" class="cursor-pointer mr-1">
        <MM-indent-right theme="two-tone" size="16" :fill="['#333' ,'#2F88FF']" v-if="!menuService.isCollapse.value" />
        <MM-indent-left theme="two-tone" size="16" :fill="['#333' ,'#2F88FF']" v-else />
      </div>
      <Breadcrumb class="hidden md:block" />
    </div>
    <div class="flex justify-center items-center relative cursor-pointer">
      <Notification class="mr-5" />
      <div @click="fullScreen" class="mr-5">
        <MM-full-screen theme="outline" size="18" fill="#333" v-if="!isFullScreen" />
        <MM-off-screen theme="outline" size="18" fill="#333" v-else />
      </div>
      <div class="group">
        <div class="flex justify-center items-center">
          <img :src="userStore().info?.avatar" class="w-8 h-8 rounded-full object-cover ">
          <span class="text-sm text-gray-600 ml-1">
            {{ userStore().info?.name }}
          </span>
        </div>
        <section class="group-hover:block absolute right-0 top-full bg-white px-3 shadow-sm whitespace-nowrap border rounded-md hidden z-10">
          <div class="flex items-center cursor-pointer border-b py-3">
            <MM-file-code-one theme="multi-color" size="14" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']" />
            <span class="text-xs text-gray-600 ml-2">文档资料</span>
          </div>
          <div class="flex items-center cursor-pointer border-b py-3">
            <MM-home theme="multi-color" size="14" :fill="['#333' ,'#2F88FF' ,'#FFF' ,'#43CCF8']" />
            <span class="text-xs text-gray-600 ml-2">网站首页</span>
          </div>
          <div class="flex items-center cursor-pointer border-b py-3" @click="utils.user.logout()">
            <MM-home theme="outline" size="14" fill="#333" />
            <span class="text-xs text-gray-600 ml-2">退出登录</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import userStore from '@/store/userStore';
  import utils from '@/utils';
  import menuService from '@/composables/menu';
  import Notification from '@/components/notification.vue';
  import Breadcrumb from '@/components/breadcrumb.vue';
  let isFullScreen = ref(false);
  /**
   * 全屏
   */
  const fullScreen = () => {
    if (!isFullScreen.value) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    isFullScreen.value = !isFullScreen.value;
  };
</script>

<style lang="scss" scoped>
</style>