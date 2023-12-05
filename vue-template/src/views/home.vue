<template>
  <div class="w-screen h-screen bg-gray-700 flex flex-col justify-center items-center">
    <img src="/images/home.jpg" alt="" class="w-52 h-52 object-cover rounded-full border-8 bg-white">
    <router-link :to="{name:'admin.home'}" class="xt-button">后台管理</router-link>
    <div class="text-gray-200 text-sm font-mono drop-shadow-md mt-6">
      XT-脚手架
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>
<script lang="ts">
  export default {
    route: { name: 'home' },
  };
</script>
<style lang="scss" scoped>
</style>