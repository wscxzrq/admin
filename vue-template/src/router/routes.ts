import { RouteRecordRaw } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home.vue"),
  },
  // {
  //   path: "/",
  //   component: () => import("@/layouts/admin.vue"), // 会被放置在 app.vue 的路由容器中进行渲染
  //   children: [
  //     {
  //       path: "admin",
  //       component: () => import("@/view/home.vue"), // 会被放置在 layouts/admin.vue 的路由容器中进行渲染
  //     },
  //   ],
  // },
] as RouteRecordRaw[];

export default routes;
