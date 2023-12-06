<!-- 历史链接 -->
<template >
  <div class="hidden md:block ">
    <div class="m-5  grid grid-flow-col gap-2 justify-start">
      <a href="" v-for="(link, index) of links" :key="index" class="bg-white rounded-md py-2 px-3  text-sm text-gray-600">
        {{ link.title }}
        <i class="fas fa-times ml-1"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const links = ref<{title:string}[]>([
  {title: '编辑器'},
  {title: '富文本'},
  {title: '用户管理'},
  {title: '销售总额'}
])
  
</script>

<style lang="scss" scoped>

</style>