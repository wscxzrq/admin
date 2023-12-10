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

export async function setupRouter(app: App<Element>) {
  const user = userStore();
  await user.getUserInfo();
  autoload(router);

  guard(router);
  app.use(router);
}

export default router;
