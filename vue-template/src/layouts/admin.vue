<!-- 用户后台管理公共库 -->
<template>
  <div class="admin">
    <!-- 左侧菜单 -->
    <menuComponent/>
    <!-- 右侧主体 -->
    <div class="content">
      <div> 
        <Navbar />
        <HistoryLink/>
      </div>
      <div class="p-3 relative overflow-y-auto">
        <router-view #default="{Component,route}">
          <Transition appear class="animate__animated"  mode="out-in"
            :enter-active-class="route.meta.enterClass ?? 'animate__fadeInRight'" 
            :leave-active-class="route.meta.leaveClass ?? 'animate__fadeOutLeft'">
            <component :is="Component" class="absolute w-full"/>
          </Transition>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import menuComponent from './admin/menu.vue';
  import Navbar from './admin/navbar.vue'
  import HistoryLink from './admin/historyLink.vue'
  import { useRoute } from 'vue-router';
  import { watch } from 'vue';
  import menuService from '@/composables/menu'
  // 记录历史路由
  const route = useRoute();
  watch(route,() => {
    menuService.addHistoryMenu(route);
  },{immediate:true})
</script>

<style lang="scss" scoped>
.admin {
  @apply min-h-screen w-screen grid md:grid-cols-[auto_1fr];
  .content {
    @apply bg-gray-100 grid grid-rows-[auto_1fr];
  }
}
.animate__fadeInRight {
  animation-duration: .5s;
}
.animate__fadeOutLeft {
  animation-duration: .3s;
}
</style>