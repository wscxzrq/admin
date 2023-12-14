import userStore from '@/store/userStore';
import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes';
import autoload from './autoload';
import guard from './guard';
const router = createRouter({
  history: createWebHistory(),
  routes: [...routes], // 合并静态路由与自动注册路由
});

/**
 * 设置路由
 * @param app 应用程序
 * 只有首次进入或刷新页面时才会执行，所以需要获取用户信息
 */
export async function setupRouter(app: App<Element>) {
  await userStore().getUserInfo();
  autoload(router);

  guard(router);
  app.use(router);
}

export default router;
