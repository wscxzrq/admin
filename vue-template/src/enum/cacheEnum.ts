// 缓存的枚举
export enum CacheEnum {
  TOKEN_NAME = 'login_token',
  /**
   * 当登录状态丢失，完成登录需要进入的路由
   */
  REDIRECT_ROUTE_NAME = 'redirect_router_name',
  /**
   * 历史路由信息
   */
  HISTORY_MENU = 'history_menu',
  /**
   * 菜单是否收缩
   */
  MENU_IS_CLOSE = 'menu_is_close',
}
