// 自动注册路由
import { env } from '@/utils';
import { RouteRecordRaw } from 'vue-router';
/**
 * import.meta.glob
 * 是一个自定义的 import 补充函数，它使用给定的 glob
 * 表达式来解析文件路径，并返回一个包含匹配文件的导入模块对象的数组。
 * @returns 返回一个对象 key 是文件名，值是模块
 */
const layouts = import.meta.glob('../layouts/*.vue', { eager: true }); // 获取所有布局文件
const views = import.meta.glob('../views/**/*.vue', { eager: true }); // 获取所有子页面 **表示支持递归到子目录

/**
 * 获取路由列表
 */
function getRouters(): RouteRecordRaw[] {
  const layoutRoutes = [] as RouteRecordRaw[];
  Object.entries(layouts).forEach(([file, module]) => {
    // 提取所有父路由
    const route = getRouteByModule(file, module!);

    // 提取所有子路由
    route.children = getChildrenRoutes(route);
    layoutRoutes.push(route);
  });
  return layoutRoutes;
}

/**
 * 获取子路由
 * @param route 路由信息
 */
function getChildrenRoutes(lauyoutRoute: RouteRecordRaw): RouteRecordRaw[] {
  const routes = [] as RouteRecordRaw[];
  Object.entries(views).forEach(([file, module]) => {
    if (file.includes(`../views/${lauyoutRoute.name as keyof typeof views}`) && !file.includes('component')) {
      const route = getRouteByModule(file, module!);
      routes.push(route);
    }
  });
  return routes;
}
/**
 * 根据文件和模块获取路由记录
 * @param file 文件路径
 * @param module 模块对象
 * @returns 路由记录
 */
function getRouteByModule(file: string, module: { [key: string]: any }): RouteRecordRaw {
  // 获取文件名，去掉文件路径和后缀
  const name: string = file.replace(/.+layouts\/|.+views\/|\.vue/gi, '');
  // 创建路由对象
  const router = {
    path: `/${name}`,
    name: name.replace('/', '.'),
    component: module.default,
  } as RouteRecordRaw;
  // module.default?.route 可选链式操作符 表示如果 module.default 存在，则获取其 route 属性；否则，结果为 undefined。
  return Object.assign(router, module.default?.route);
}

const routes = env.VITE_ROUTER_AUTOLOAD ? getRouters() : ([] as RouteRecordRaw[]);
export default routes;
