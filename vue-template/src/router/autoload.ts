// 自动注册路由
import { RouteRecordRaw } from "vue-router";
/**
 * import.meta.glob
 * 是一个自定义的 import 补充函数，它使用给定的 glob
 * 表达式来解析文件路径，并返回一个包含匹配文件的导入模块对象的数组。
 * @returns 返回一个对象 key 是文件名，值是模块
 */

const layouts = import.meta.glob("../layouts/*.vue", { eager: true });

Object.entries(layouts).forEach(([file, module]) => {
  const route = getRouteByModule(file, module!);
});

function getRouteByModule(file: string, module: { [key: string]: any }) {}

const layoutRoutes = [] as RouteRecordRaw[];

export default layoutRoutes;
