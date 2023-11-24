import path from "path";
import { AliasOptions } from "vite";
// 配置别名
const alias = {
  "@": path.resolve(__dirname, "../src"), // 路由别名，将 @ 符号定位到src 目录
} as AliasOptions;

export default alias;
