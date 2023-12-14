// 扩展 RouteMeta 接口来输入 meta 字段：
import 'vue-router';
import { IMenu } from './menu';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 是否需要 token 验证
     */
    auth?: boolean;
    /**
     * 是否需要 游客验证
     */
    guest?: boolean;
    /**
     * 菜单配置项
     */
    menu?: IMenu;
    /**
     * 页面进入动画
     */
    enterClass?: string;
    /**
     * 页面离开动画
     */
    leaveClass?: string;
    /**
     * 权限
     */
    permission?: string;
  }
}
