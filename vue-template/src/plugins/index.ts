import { App } from 'vue';
import { setupTailwindcss } from './tailwindcss';
import _ from 'lodash';
import setupElementPlus from './elementui';
import setupPinia from './pinia';
import setupElementIcon from './element-icon';
import setupIconPark from './iconpark';

export function setupPlugins(app: App) {
  autoRegisterComponent(app);
  setupTailwindcss();
  setupElementPlus(app);
  setupPinia(app);
  setupElementIcon(app);
  setupIconPark(app);
}

/**
 * 自动注册全局组件
 * @param app App.vue 组件
 */
function autoRegisterComponent(_app: App) {
  const components = import.meta.glob('../components/form/*.vue', {
    eager: true,
  });
}
