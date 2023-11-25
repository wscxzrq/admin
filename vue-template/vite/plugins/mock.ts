import { viteMockServe } from "vite-plugin-mock";
/**
 * 设置mock插件
 * @param isBuild 是否为构建过程
 * @returns 返回mock插件
 */
export function setupMockPlugin(isBuild: boolean) {
  return viteMockServe({
    mockPath: "mock",
    enable: !isBuild, // 开发环境的时候启动mock服务
  });
}
