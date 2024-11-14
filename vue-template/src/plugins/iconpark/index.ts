import { install } from '@icon-park/vue-next/es/all';
import { App } from 'vue';

/**
 * 注册字节图标库
 * 注意 需要在标签前 增加 MM- 前缀
 * @param app vue app
 */
export default function setupIconPark(app: App) {
  install(app, 'MM');
}
