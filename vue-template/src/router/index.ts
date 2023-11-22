import { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import layoutRoutes from "./autoload";

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes, ...layoutRoutes], // 合并静态路由与自动注册路由
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;
