// 扩展 RouteMeta 接口来输入 meta 字段：
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    auth?: boolean;
  }
}
