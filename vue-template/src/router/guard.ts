import { store } from '@/utils';
import { RouteLocationNormalized, Router } from 'vue-router';
import IData from '@/utils/store';
// 路由守卫
class Guard {
  public run() {
    this.router.beforeEach((to, from) => {
      /**
       * vue 会把当前路由与路由元信息进行合并
       * 对登录路由进行验证
       */
      let token = store.get('token')?.token;
      if (this.isLogin(to, token) === false) return { name: 'login' };
    });
  }

  constructor(private router: Router) {}

  /**
   * 路由检测
   * @param router  当前路由信息
   * @param token
   */
  private isLogin(router: RouteLocationNormalized, token: any): boolean {
    // 如果不需要验证或者存在 token 那么可以访问
    return Boolean(!router.meta.auth || (router.meta.auth && token));
  }
}

export default (router: Router) => {
  new Guard(router).run();
};
