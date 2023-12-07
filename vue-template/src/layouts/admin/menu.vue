<template>
  <div class="menu">
    <div class="logo">
      <img src="/images/logo.jpg" class="object-cover" alt="">
      <span class="text-sm">XT-后台管理系统</span>
    </div>
    <!-- 菜单 -->
    <div class="left-container">
      <dl v-for="(route,index) of routerStore.routes" :key="index">
        <dt @click="handle(route)">
          <section>
            <i :class="route.meta.icon"></i>
            <span class="text-sm">{{route.meta.title}}</span>
          </section>
          <section>
            <i class="fas fa-angle-down duration-300" :class="{'rotate-180':route.meta.isClick}"></i>
          </section>
        </dt>
        <dd v-show="route.meta.isClick" :class="{active:childRoute.meta?.isClick}" 
          v-for="(childRoute,key) of route.children" :key="key" @click="handle(route,childRoute)">
            {{ childRoute.meta?.title }}
        </dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import {router} from '@/store/router'
  import { useRouter } from 'vue-router';
  import { RouteRecordNormalized } from 'vue-router';
  import { RouteRecordRaw } from 'vue-router';
  const routerService = useRouter();
  const routerStore = router();  

  /**
   * 菜单点击事件
   * @param pmenu 父级菜单
   * @param cmenu  子级菜单
   */
  const handle = (pRoute: RouteRecordNormalized, cRoute?: RouteRecordRaw) => {
    resetMenus();
    pRoute.meta.isClick = true;
    if(cRoute && cRoute.meta) {
      cRoute.meta.isClick = true;
      routerService.push(cRoute)
    }
  };
  
  /**
   * 重置菜单
   */
  const resetMenus = () => {
    routerStore.routes.forEach(route => {
      route.meta.isClick = false;
      route.children?.forEach(route => {
        if(route.meta) {
          route.meta.isClick = false;
        }
      });
    });
  };
</script>

<style lang="scss" scoped>
  .menu {
    @apply w-[200px] bg-gray-800 p-4;
    .logo {
      @apply text-gray-300 flex justify-center items-center flex-col shadow-md;
      img {
        @apply w-16 h-16 rounded-full mb-1;
      }
    }
    .left-container {
      dl {
        @apply text-gray-300 text-sm;
        dt {
          @apply text-sm mt-6 flex justify-between items-center cursor-pointer;
          section {
            @apply flex items-center;
            i {
              @apply mr-2 text-sm;
            }
          }
        }
        dd {
          @apply py-3 pl-4 my-2 text-white rounded-md cursor-pointer bg-gray-700 hover:bg-violet-500 duration-300;
          &.active {
            @apply bg-violet-700;
          }
        }
      }
    }
  }
  
</style>