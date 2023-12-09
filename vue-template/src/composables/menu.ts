import { IMenu } from '#/menu';
import { CacheEnum } from '@/enum/cacheEnum';
import router from '@/router';
import store from '@/utils/store';
import { ref } from 'vue';
import { RouteLocationNormalizedLoaded } from 'vue-router';

class Menu {
  /**
   * 左侧菜单
   */
  public menu = ref<IMenu[]>([]);
  /**
   * 顶部菜单
   */
  public history = ref<IMenu[]>([]);
  /**
   * 是否伸缩
   */
  public isCollapse = ref(false);

  constructor() {
    this.menu.value = this.getMenuByRoute();
    this.history.value = store.get(CacheEnum.HISTORY_MENU) ?? [];
  }
  /**
   * 切换菜单状态
   */
  toggleState() {
    this.isCollapse.value = !this.isCollapse.value;
  }

  /**
   * 设置当前选中菜单
   */
  setCurrentMenu(route: RouteLocationNormalizedLoaded) {
    this.menu.value.forEach(m => {
      m.isClick = false;
      m.children?.forEach(c => {
        c.isClick = false;
        if (c.route === route.name) {
          m.isClick = true;
          c.isClick = true;
        }
      });
    });
  }
  /**
   * 根据路由获取菜单
   */
  getMenuByRoute() {
    return router
      .getRoutes()
      .filter(route => route.children.length > 0 && route.meta.menu)
      .map(route => {
        let menu: IMenu = { ...route.meta?.menu };
        menu.children = route.children
          .filter(route => route.meta?.menu)
          .map(route => {
            return { ...route.meta?.menu, route: route.name };
          }) as IMenu[];
        return menu;
      })
      .filter(menu => menu.children?.length);
  }
}

export default new Menu();
