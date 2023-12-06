import { RouteRecordRaw } from 'vue-router';

// 根据模块自动注册路由
export default function autoloadModuleRoutes(): RouteRecordRaw[] {
  const modules: { [key: string]: any } = import.meta.glob('../module/**/*.ts', { eager: true });
  const routes = [] as RouteRecordRaw[];
  Object.keys(modules).forEach(key => {
    routes.push(modules[key].default);
  });

  return routes;
}
