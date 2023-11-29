<template>
  <div class="bg-slate-300 h-screen flex justify-center items-start md:items-center p-5 md:p-0">
    <div class="w-[720px] translate-y-32 md:translate-y-0 bg-white md:grid grid-cols-2 rounded-md overflow-hidden">
      <div class="p-6 shadow-md">
        <h2 class="text-center text-gray-700 text-lg">会员登录</h2>
        <div class="mt-8">
          <xt-input />
          <xt-input class="mt-3" />
        </div>
        <xt-button />
        <div class="flex gap-2 mt-5 justify-center">
          <xt-link />
          <xt-link />
          <xt-link />
          <xt-link />
        </div>
      </div>
      <div class="hidden md:block">
        <img src="/images/login.jpg" alt="" class="h-80 w-full object-cover">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
</style>