import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';

export const router = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      routes: getRoutes(),
    };
  },
});

/**
 * 过滤路由数据
 * @returns 过滤后的路由
 */
function getRoutes() {
  const router = useRouter();

  const routes = router
    .getRoutes()
    .filter(route => route.children.length > 0 && route.meta.show)
    .map(route => {
      route.children = route.children.filter(route => route.meta?.show);
      return route;
    })
    .filter(route => route.children.length > 0);

  return routes;
}
