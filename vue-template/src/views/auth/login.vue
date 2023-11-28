<template>
  <div class="bg-slate-300 h-screen flex justify-center items-start md:items-center p-5 md:p-0">
    <div class="w-[720px] translate-y-32 md:translate-y-0 bg-white md:grid grid-cols-2 rounded-md overflow-hidden">
      <div class="p-6 shadow-md">
        <h2 class="text-center text-gray-700 text-lg">会员登录</h2>
        <div class="mt-8">
          <input type="text" placeholder="请输入手机号或邮箱" class="xt-input">
          <input type="text" placeholder="请输入手机号或邮箱" class="xt-input mt-3">
        </div>
        <button class="xt-button mt-5">登录</button>
        <div class="flex gap-2 mt-5 justify-center">
          <a href="" class="xt-href">网站首页</a>
          <a href="" class="xt-href">会员注册</a>
          <a href="" class="xt-href">找回密码</a>
          <a href="" class="xt-href">找回密码</a>
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
div {
  .xt-input {
    @apply border border-gray-300 placeholder:text-sm w-full rounded-md py-1 px-2
      outline-none focus:ring-2 ring-offset-2 ring-violet-600 duration-300 focus:border-white;
  }
  .xt-button {
    @apply bg-violet-700 text-white w-full py-2 rounded-md mt-3 hover:bg-violet-500 duration-300;
  }
  .xt-href {
    @apply text-xs text-gray-700;
  }
}
</style>