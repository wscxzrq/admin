<template>
  <div class="w-screen h-screen bg-gray-700 flex flex-col justify-center items-center">
    <img src="/images/home.jpg" alt="" class="w-52 h-52 object-cover rounded-full border-8 bg-white mb-5">
    <div>
      <router-link :to="{name:'admin.home'}" class="mm-button">后台管理</router-link>
      <router-link v-if="!utils.user.isLogin()" :to="{name:'login'}" class="mm-button ml-3">登录</router-link>
    </div>
    <div class="text-gray-200 text-sm font-mono drop-shadow-md mt-6">
      MM-脚手架
    </div>
  </div>
</template>

<script lang="ts" setup>
  import utils from '@/utils';
</script>
<style lang="scss" scoped>
</style>