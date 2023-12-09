import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { IMenu } from '#/menu';
import { defineStore } from 'pinia';
import router from '@/router';
import store from '@/utils/store';
import { CacheEnum } from '@/enum/cacheEnum';
export default defineStore('menu', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      menus: [] as IMenu[],
      /**
       * 历史菜单
       */
      historyMenu: [] as IMenu[],
    };
  },
  actions: {
    /**
     * 初始化菜单
     */
    init() {
      this.historyMenu = store.get(CacheEnum.HISTORY_MENU) ?? [];
    },
    /**
     * 添加历史菜单
     */
    addHistoryMenu(route: RouteLocationNormalized) {
      if (!route.meta?.menu) return;
      const menu: IMenu = { ...route.meta?.menu, route: route.name as string };
      const isHas = this.historyMenu.some(menu => menu.route === route.name);
      if (!isHas) {
        this.historyMenu.unshift(menu);
      }
      if (this.historyMenu.length > 10) {
        this.historyMenu.pop();
      }

      // 缓存历史路由信息
      store.set(CacheEnum.HISTORY_MENU, this.historyMenu);
    },

    /**
     * 删除历史菜单
     * @param menu 点击 X 号的菜单项
     */
    removeHistoryMenu(menu: IMenu) {
      const index = this.historyMenu.indexOf(menu);
      this.historyMenu.splice(index, 1);
    },
  },
});
