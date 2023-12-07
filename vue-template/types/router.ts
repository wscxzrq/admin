// 扩展 RouteMeta 接口来输入 meta 字段：
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean; // 是否需要 token 验证
    guest?: boolean; // 游客验证
    show?: boolean; // 路由是否在菜单中显示
    title?: string; // 路由标题
    icon?: string; // 路由图标
    isClick?: boolean; // 是否激活菜单
    permissions?: string[]; // 权限列表
  }
}
