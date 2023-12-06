<template>
  <div class="menu">
    <div class="logo">
      <img src="/images/logo.jpg" class="object-cover" alt="">
      <span class="text-sm">XT-后台管理系统</span>
    </div>
    <!-- 菜单 -->
    <div class="left-container">
      <dl v-for="(menu,index) of menus" :key="index">
        <dt @click="handle(menu)">
          <section>
            <i :class="menu.icon" class="fa-solid fa-circle-exclamation"></i>
            <span class="text-sm">{{menu.title}}</span>
          </section>
          <section>
            <i class="fas fa-angle-down duration-300" :class="{'rotate-180':menu.active}"></i>
          </section>
        </dt>
        <dd v-show="menu.active" :class="{active:cmenu.active}" v-for="(cmenu,key) of menu.children" :key="key">{{ cmenu.title }}</dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  interface IMenuItem {
    title: string;
    icon?: string;
    active?: boolean;
  }

  interface IMenu extends IMenuItem {
    children?: IMenuItem[];
  }

  const menus = ref<IMenu[]>([
    {
      title: '错误页面',
      icon: ' ',
      active: true,
      children: [
        {
          title: '404页面',
          icon: 'user',
          active: true,
        },
        {
          title: '403 页面',
          icon: 'user',
          active: false,
        },
        {
          title: '500 页面',
          icon: 'user',
          active: false,
        },
      ],
    },
    {
      title: '编辑器',
      active: false,
      children: [
        {
          title: 'markdown编辑器',
          active: false,
          icon: 'user',
        },
        {
          title: '富文本编辑器',
          active: false,
          icon: 'user',
        },
      ],
    },
  ]);

  /**
   * 菜单点击事件
   * @param pmenu 父级菜单
   * @param cmenu  子级菜单
   */
  const handle = (pmenu: IMenuItem, cmenu?: IMenuItem) => {
    resetMenus();
    pmenu.active = true;
  };

  /**
   * 重置菜单
   */
  const resetMenus = () => {
    menus.value.forEach(menu => {
      menu.active = false;
      menu.children?.forEach(child => {
        child.active = false;
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
              @apply mr-2 text-xs;
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