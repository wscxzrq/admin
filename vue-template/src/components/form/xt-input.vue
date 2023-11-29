<template>
  <input type="text" placeholder="请输入手机号或邮箱" class="xt-input">
</template>

<script lang="ts" setup>
</script>

<style lang="scss" scoped>
.xt-input {
  @apply border border-gray-300 placeholder:text-sm w-full rounded-md py-1 px-2
      outline-none focus:ring-2 ring-offset-2 ring-violet-600 duration-300 focus:border-white;
}
</style>