
<script setup lang="ts">
  // import { env } from './types/helper'
  // console.log(env.VITE_ROUTE_AUTOLOAD)

  // const res = await fetch(' http://127.0.0.1:5173/api/get').then((r) => r.json())
  // console.log('res', res)

  // import userApi from './api/userApi'
  // const res = await userApi.info()
  // console.log('res', res)

  // const login = await userApi.login()
  // console.log('login', login.data.token)
</script>

<template>
  <!-- <ul>
    <li>首页</li>
    <li>商品</li>
    <li>评价</li>
  </ul> -->
  <router-view />
</template>

<style scoped>
</style>
