import { CacheEnum } from '@/enum/cacheEnum';
import userStore from '@/store/userStore';
import utils from '@/utils';
import { RouteLocationNormalized, Router } from 'vue-router';
// 路由守卫
class Guard {
  constructor(private router: Router) {}

  public run() {
    this.router.beforeEach(this.beforeEach.bind(this));
  }

  /**
   * 前置路由守卫
   * @param to
   * @param _from
   */
  private async beforeEach(to: RouteLocationNormalized, _from: RouteLocationNormalized) {
    /**
     * vue 会把当前路由与路由元信息进行合并
     * 对登录路由进行验证
     */
    if (!this.isLogin(to)) return { name: 'login' };
    // 如果游客标识为假或者没有 token 那么返回主页
    if (!this.isGuest(to)) return { name: 'home' };
  }

  /**
   * 获取 token
   * @returns  token
   */
  private token(): string | null {
    return utils.store.get(CacheEnum.TOKEN_NAME);
  }

  /**
   * 获取用户信息
   *
   */
  private getUserInfo() {
    if (this.token()) {
      return userStore().getUserInfo();
    }
  }

  /**
   * 路由检测 是否登录
   * @param router  当前路由信息
   */
  private isLogin(router: RouteLocationNormalized): boolean {
    // 如果不需要验证或者需要验证 并且存在token 那么可以访问
    const state = Boolean(!router.meta.auth || (router.meta.auth && this.token()));
    // 如果当前页面需要登录状态，但是当前没有登录状态
    if (!state) {
      utils.store.set(CacheEnum.REDIRECT_ROUTE_NAME, router.name);
    }

    return state;
  }

  /**
   * 如果不是游客或者是游客但是没有 token
   * @param router 当前路由信息
   */
  private isGuest(router: RouteLocationNormalized) {
    return Boolean(!router.meta.guest || (router.meta.guest && !this.token()));
  }
}

export default (router: Router) => {
  new Guard(router).run();
};
