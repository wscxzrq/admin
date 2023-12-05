import { store } from '@/utils';
import { RouteLocationNormalized, Router } from 'vue-router';
import IData from '@/utils/store';
import { debug } from 'console';
// 路由守卫
class Guard {
  public run() {
    this.router.beforeEach((to, from) => {
      /**
       * vue 会把当前路由与路由元信息进行合并
       * 对登录路由进行验证
       */
      let token = store.get('token')?.token;
      if (!this.isLogin(to, token)) return { name: 'login' };
      // 如果游客标识为假或者没有 token 那么返回主页
      if (!this.isGuest(to, token)) return { name: 'home' };
    });
  }

  constructor(private router: Router) {}

  /**
   * 路由检测 是否登录
   * @param router  当前路由信息
   * @param token
   */
  private isLogin(router: RouteLocationNormalized, token: any): boolean {
    // 如果不需要验证或者存在 token 那么可以访问
    return Boolean(!router.meta.auth || (router.meta.auth && token));
  }

  /**
   * 检测是否是游客
   * @param router 当前路由信息
   * @param token
   */
  private isGuest(router: RouteLocationNormalized, token: any) {
    return Boolean(!router.meta.guest || (router.meta.guest && !token));
  }
}

export default (router: Router) => {
  new Guard(router).run();
};
