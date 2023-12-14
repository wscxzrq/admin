import { CacheEnum } from '@/enum/cacheEnum';
import store from './store';
import userApi, { ILoginData } from '@/api/userApi';
import router from '@/router';
import userStore from '@/store/userStore';
// 用户相关工具函数
export function logout() {
  store.remove(CacheEnum.TOKEN_NAME);
  router.push({ name: 'home' });
  userStore().info = null;
}

export async function login(values: ILoginData) {
  const {
    data: { token },
  } = await userApi.login(values);
  store.set(
    CacheEnum.TOKEN_NAME,
    {
      token,
    },
    1000 * 60 * 60 * 24,
  );
  userStore().getUserInfo();

  // 如果存在被拦截的路由那么跳转到被拦截路由否则跳转到 home
  const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home';
  router.push({ name: routeName });
}

export function isLogin() {
  return Boolean(store.get(CacheEnum.TOKEN_NAME));
}
