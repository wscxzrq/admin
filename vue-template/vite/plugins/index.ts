import vue from "@vitejs/plugin-vue";
import { Plugin } from "vite";
import { setupMockPlugin } from "./mock";
/**
 * 设置插件
 * @param isBuild - 是否构建
 * @param env - 环境变量
 * @returns {Plugin[]} - 插件数组
 */
export default function setupPlugin(isBuild: boolean, env: ViteEnv) {
  const plugins: Plugin[] = [vue()];
  plugins.push(setupMockPlugin(isBuild));
  return plugins;
}
