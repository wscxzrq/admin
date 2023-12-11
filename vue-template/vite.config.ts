import { ConfigEnv, loadEnv } from 'vite';
import alias from './vite/alias';
import { parseEnv } from './vite/util';
import setupPlugins from './vite/plugins/index';
import { visualizer } from 'rollup-plugin-visualizer';
export default ({ command, mode }: ConfigEnv) => {
  const isBuild = command === 'build';
  // process.cwd() 获取当前的工作目录路径
  const root = process.cwd();
  // loadEnv 加载 envDir 中的 .env 文件。默认情况下只有前缀为 VITE_ 会被加载，除非更改了 prefixes 配置。
  const env = parseEnv(loadEnv(mode, root));
  // mock
  return {
    plugins: [...setupPlugins(isBuild, env), visualizer()],
    resolve: {
      alias,
    },
    // 分快打包
    build: {
      rollupOptions: {
        emptyOutDir: true, // 清空编译目录
        output: {
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          },
        },
      },
    },
  };
};
