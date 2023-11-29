<template>
  <h2>Admin</h2>
  <router-view />
</template>

<script lang="ts">
  // 定义路由元信息 需要验证
  export default {
    route: { meta: { auth: true } },
  };
</script>

<style lang="scss" scoped>
</style>