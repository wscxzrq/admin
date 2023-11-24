import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import alias from "./vite/alias";
import { parseEnv } from "./vite/util";

export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === "build";
  // process.cwd() 获取当前的工作目录路径
  const root = process.cwd();
  // loadEnv 加载 envDir 中的 .env 文件。默认情况下只有前缀为 VITE_ 会被加载，除非更改了 prefixes 配置。
  const env = parseEnv(loadEnv(mode, root));
  return {
    plugins: [vue()],
    resolve: {
      alias,
    },
  };
};
