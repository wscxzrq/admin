<template>
  <div class="admin">
    <!-- 左侧菜单 -->
    <menuComponent />
    <!-- 右侧主体 -->
    <div class="content">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import menuComponent from './admin/menu.vue';
  import Navbar from './admin/navbar.vue'
</script>
<script lang="ts">
  // 定义路由元信息 需要验证
  export default {
    route: { meta: { auth: true } },
  };
</script>

<style lang="scss" scoped>
.admin {
  @apply h-screen w-screen flex;
  .content {
    @apply flex-1 bg-gray-200;
  }
}
</style>