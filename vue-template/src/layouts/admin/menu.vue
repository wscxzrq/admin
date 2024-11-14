<template>
  <div class="admin-menu" :class="{ close: menuService.isCollapse.value }">
    <div class="menu">
      <div class="logo">
        <img src="/images/logo.jpg" class="w-[25px] h-[25px] p-2" alt="" />
        <span class="text-sm">MM-后台管理系统</span>
      </div>
      <!-- 菜单 -->
      <div class="left-container">
        <dl v-for="(menu, index) of menuServe.menu.value" :key="index">
          <dt @click="menu.isClick = !menu.isClick">
            <section>
              <component :is="icons[menu.icon!]" size="18" fill="#dcdcdc" class="mr-2" />
              <span class="text-sm">{{ menu.title }}</span>
            </section>
            <section>
              <el-icon class="duration-300" :class="{ 'rotate-180': menu.isClick }">
                <ArrowDown />
              </el-icon>
            </section>
          </dt>
          <dd :class="!menu.isClick || menuServe.isCollapse.value ? 'hidden' : 'block'">
            <div :class="{ active: cmenu?.isClick }" v-for="(cmenu, key) of menu.children" :key="key" @click="$router.push({ name: cmenu.route })">
              {{ cmenu?.title }}
            </div>
          </dd>
        </dl>
      </div>
    </div>
    <div class="bg block md:hidden" @click="menuServe.isCollapse.value = !menuServe.isCollapse.value"></div>
  </div>
</template>

<script lang="ts" setup>
  import menuServe from '@/composables/menu';
  import { watch } from 'vue';
  import { useRoute } from 'vue-router';
  import menuService from '@/composables/menu';
  import * as icons from '@icon-park/vue-next';
  const route = useRoute();
  watch(route, () => menuServe.setCurrentMenu(route), { immediate: true });
</script>

<style lang="scss" scoped>
.admin-menu {
  @apply z-20;
  .menu {
    @apply w-[200px] h-full bg-gray-800 p-2;
    .logo {
      @apply text-gray-300 flex justify-center items-center flex-col pb-4;
      img {
        @apply w-16 h-16 rounded-full mb-1;
      }
    }
    .left-container {
      dl {
        @apply text-gray-300 text-sm relative;
        dt {
          @apply text-sm p-3 flex justify-between items-center cursor-pointer;
          section {
            @apply flex items-center;
            i {
              @apply mr-2 text-sm;
            }
          }
        }
        dd {
          div {
            @apply py-3 pl-4 my-2 text-white rounded-md cursor-pointer bg-gray-700 hover:bg-violet-500 duration-300;
            &.active {
              @apply bg-violet-700;
            }
          }
        }
      }
    }
  }
}
// 屏幕宽度大于 768px
@media screen and (min-width: 768px) {
  .admin-menu {
    &.close {
      .menu {
        @apply w-auto;
        .logo {
          span {
            @apply hidden;
            &.i-icon {
              @apply block;
            }
          }
        }
        .left-container {
          dl {
            dt {
              @apply flex justify-center;
              section {
                span {
                  @apply hidden;
                  &.i-icon {
                    @apply block;
                  }
                }
                &:nth-of-type(2) {
                  @apply hidden;
                }
              }
            }
            &:hover {
              dd {
                @apply block absolute left-full top-[0px] w-[200px] bg-gray-700;
              }
            }
          }
        }
      }
    }
  }
}

// 屏幕宽度小于 768px
@media screen and (max-width: 768px) {
  .admin-menu {
    @apply h-screen w-[200px] absolute left-0 top-0 z-50;
    .menu {
      @apply h-full z-50 absolute;
    }
    .bg {
      @apply bg-gray-200 opacity-75 w-screen h-screen z-40 absolute left-0 top-0;
    }
    &.close {
      @apply hidden;
    }
  }
}
</style>
