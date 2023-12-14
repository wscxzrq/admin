import { CacheEnum } from '@/enum/cacheEnum';
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
   * @param from
   */
  private async beforeEach(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    // 目标路由需要验证token 并且没有 token
    if (to.meta.auth && !this.token()) return { name: 'login' };
    // 目标路由必须是游客才可以访问，但是已经登录了
    if (to.meta.guest && this.token()) return from;
  }

  /**
   * 获取 token
   * @returns  token
   */
  private token(): string | null {
    return utils.store.get(CacheEnum.TOKEN_NAME);
  }
}

export default (router: Router) => {
  new Guard(router).run();
};
