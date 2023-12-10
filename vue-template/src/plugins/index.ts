import { App } from 'vue';
import { setupTailwindcss } from './tailwindcss';
import _ from 'lodash';
import setupElementPlus from './elementui';
import setupPinia from './pinia';
import setupElementIcon from './element-icon';

export function setupPlugins(app: App) {
  autoRegisterComponent(app);
  setupTailwindcss();
  setupElementPlus(app);
  setupPinia(app);
  setupElementIcon(app);
}

/**
 * 自动注册全局组件
 * @param app App.vue 组件
 */
function autoRegisterComponent(app: App) {
  const components = import.meta.glob('../components/form/*.vue', {
    eager: true,
  });
  Object.entries(components).forEach(([key, module]) => {
    completeComponentRegistration(app, key, module!);
  });
}

// 完成组件注册
function completeComponentRegistration(app: App, key: string, module: { [key: string]: any }) {
  const name = _.camelCase(key.split('/').pop()?.split('.')[0]) as string;
  app.component(name, module.default);
}
