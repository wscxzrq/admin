import { IMenu } from '#/menu';
import { CacheEnum } from '@/enum/cacheEnum';
import router from '@/router';
import utils from '@/utils';
import { ref } from 'vue';
import { RouteLocationNormalized, RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';

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
  /**
   * 面包屑路由
   */
  public route = ref(null as null | RouteLocationNormalizedLoaded);

  constructor() {
    this.menu.value = this.getMenuByRoute();
    this.history.value = this.getHistoryMenu();
  }

  /**
   * 获取历史菜单
   */
  private getHistoryMenu() {
    const routes: RouteRecordRaw[] = [];
    router.getRoutes().map(r => routes.push(...r.children));
    let history: IMenu[] = utils.store.get(CacheEnum.HISTORY_MENU) ?? [];
    return history.filter(m => {
      return routes.some(r => r.name == m.route);
    });
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
    // 获取所有路由配置
    return (
      router
        .getRoutes()
        // 过滤出包含子路由且有菜单元信息的父路由
        .filter(route => route.children.length > 0 && route.meta.menu)
        .map(route => {
          // 为父路由创建菜单对象，并复制元信息
          let menu: IMenu = { ...route.meta?.menu };
          // 过滤出包含菜单元信息的子路由
          menu.children = route.children
            .filter(route => route.meta?.menu)
            // 为每个子路由创建菜单对象，并复制元信息
            .map(route => {
              return { ...route.meta?.menu, route: route.name };
            }) as IMenu[];
          return menu;
        })
        .filter(menu => menu.children?.length)
    );
  }

  /**
   * 添加历史菜单
   */
  addHistoryMenu(route: RouteLocationNormalized) {
    if (!route.meta?.menu) return;
    this.route.value = route;
    const menu: IMenu = { ...route.meta?.menu, route: route.name as string };
    const isHas = this.history.value.some(menu => menu.route === route.name);
    if (!isHas) {
      this.history.value.unshift(menu);
    }
    if (this.history.value.length > 10) {
      this.history.value.pop();
    }

    // 缓存历史路由信息
    utils.store.set(CacheEnum.HISTORY_MENU, this.history.value);
  }

  /**
   * 删除历史菜单
   * @param menu 点击 X 号的菜单项
   */
  removeHistoryMenu(menu: IMenu) {
    const index = this.history.value.indexOf(menu);
    this.history.value.splice(index, 1);
    utils.store.set(CacheEnum.HISTORY_MENU, this.history.value);
  }
}

export default new Menu();
