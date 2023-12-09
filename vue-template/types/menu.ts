// 定义菜单类型约束
interface Menu {
  /**
   * 名称
   */
  title?: string;
  /**
   * 图标
   */
  icon?: string;
  /**
   * 是否点击
   */
  isClick?: boolean;
  /**
   * 路由名称
   */
  route?: string;
}

export interface IMenu extends Menu {
  children?: Menu[];
}
