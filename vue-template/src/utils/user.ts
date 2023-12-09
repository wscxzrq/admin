import { CacheEnum } from '@/enum/cacheEnum';
import store from './store';
import userApi, { ILoginData } from '@/api/userApi';
import router from '@/router';
import { user } from '@/store/userStore';
// 用户相关工具函数
export function logout() {
  store.remove(CacheEnum.TOKEN_NAME);
  router.push({ name: 'home' });
  user().info = null;
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
  const routeName = store.get(CacheEnum.REDIRECT_ROUTE_NAME) ?? 'home';
  router.push({ name: routeName });
}
