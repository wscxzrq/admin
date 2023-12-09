<!-- 历史链接 -->
<template >
  <div class="hidden md:block p-3 border-t border-b bg-gray-50 shadow-sm" v-show="menuService.history.value.length">
    <div class=" grid grid-flow-col gap-2 justify-start cursor-pointer">
      <div  v-for="(link, index) of menuService.history.value" :key="index" class="
       hover:bg-violet-600 hover:text-white duration-300 border rounded-sm shadow-sm py-2 px-3  text-sm text-gray-600"
       :class="{'text-white bg-violet-600':$route.name == link.route}">
        <router-link :to="{name:link.route}">
          {{ link.title }}
        </router-link>
        <i class="fas fa-times ml-1 hover:text-yellow-600 cursor-pointer"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import menuService from '@/composables/menu'
</script>

<style lang="scss" scoped>

</style> 