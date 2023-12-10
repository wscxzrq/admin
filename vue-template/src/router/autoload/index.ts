import util from '@/utils';
import { RouteRecordRaw, Router } from 'vue-router';
import getRouters from './view';
import autoloadModuleRoutes from './module';
import userStore from '@/store/userStore';
let routes = [] as RouteRecordRaw[];

if (util.env.VITE_ROUTER_AUTOLOAD) {
  routes = getRouters();
} else {
  routes = autoloadModuleRoutes();
}

/**
 * 自动加载路由
 * @param router 路由器实例
 */
function autoload(router: Router) {
  const user = userStore();
  routes = routes.map(route => {
    route.children = route.children?.filter(r => {
      const permission = r.meta?.permissions;
      return permission ? user.info?.permissions?.includes(permission as string) : true;
    });
    return route;
  });
  routes.forEach(route => {
    router.addRoute(route);
  });
}
export default autoload;
