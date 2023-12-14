import vue from '@vitejs/plugin-vue';
import { Plugin } from 'vite';
import { setupMockPlugin } from './mock';
import autoImport from './autuImport';
/**
 * 设置插件
 * @param isBuild - 是否构建
 * @param _env - 环境变量
 * @returns {Plugin[]} - 插件数组
 */
export default function setupPlugin(isBuild: boolean, _env: ImportMetaEnv) {
  const plugins: Plugin[] = [vue()];
  plugins.push(setupMockPlugin(isBuild));
  autoImport(plugins);
  return plugins;
}
