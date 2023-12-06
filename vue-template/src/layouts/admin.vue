<!-- 用户后台管理公共库 -->
<template>
  <div class="admin">
    <!-- 左侧菜单 -->
    <menuComponent class="hidden md:block"/>
    <!-- 右侧主体 -->
    <div class="content">
      <Navbar />
      <HistoryLink/>
      <div class="m-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import menuComponent from './admin/menu.vue';
  import Navbar from './admin/navbar.vue'
  import HistoryLink from './admin/historyLink.vue'
</script>
<script lang="ts">
  // 定义路由元信息 需要验证
  export default {
    route: { meta: { auth: true } },
  };
</script>

<style lang="scss" scoped>
.admin {
  @apply min-h-screen w-screen flex;
  .content {
    @apply flex-1 bg-gray-100;
  }
}
</style>