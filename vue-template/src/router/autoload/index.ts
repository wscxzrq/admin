import util from '@/utils';
import { RouteRecordRaw } from 'vue-router';
import getRouters from './view';
import autoloadModuleRoutes from './module';

let routes = [] as RouteRecordRaw[];

if (util.env.VITE_ROUTER_AUTOLOAD) {
  routes = getRouters();
} else {
  routes = autoloadModuleRoutes();
}
// 通过权限过滤路由
export default routes;
