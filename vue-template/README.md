# 使用指南

1. 本项目使用 `vite` + `Vue3` 的 `Composition` API

## 创建步骤

1. `node` 版本使用 `14`及以上 `14`版本 `node` 可以正常启动但是关闭会报错，建议使用 `16`版本

2. `npm create vite` 创建项目，输入项目名称、选择 `Vue` 、选择 `TypeScript`

3. `npm i`

4. `npm add vue-router@4` 安装 `vue-router@4`

5. `npm add -D path` 安装 `path` 模块 设置类型别名

6. `npm add -D @type/node` 安装类型声明

7. `npm add lodash` 安装 lodash 工具库

8. `npm add -D @types/lodash` 安装 lodash 类型声明

9. `npm add mockjs` 安装 mockjs 模拟数据

10. `npm add -D vite-plugin-mock@2.9.8` 安装 mockjs 插件

11. `npm add -D @types/mockjs` 安装 mockjs 类型声明

12. `npm add axios` 安装 axios 工具库

13. `npm add -D @types/axios` 安装 axios 类型声明

14. `npm add -D tailwindcss postcss autoprefixer` 安装 tailwindcss 工具库和 postcss 工具库

15. `npm add -D sass` 安装 sass 工具库

16. `npm add vee-validate@4.7.0 @vee-validate/rules@4.7.0 yup@0.32.11` 安装表单验证工具库 注意版本如果版本不一致会导致 `TS` 校验报错 校验时 `name` 属性提示 `undefined`

    1. `vee-validate` 用于 Vue 组件中进行表单验证

    2. `@vee-validate/rules` 提供常见表单验证规则的插件

    3. `yup` 用于构建模式验证期器的库，可以与 JavaScript 与 Vue 一起使用，提供了一种简单且类型安全的方式来定义和执行模式验证

17. `npm add @vee-validate/i18n@4.7.0` 安装中文语言扩展

18. `npm add element-plus` 安装 element-plus 组件库

19. `npm add -D @types/element-plus` 安装 element

## 项目结构

全局安装了 mddir 可以直接使用 mddir 命令进行结构树生成

## 新建页面注意事项

- `layouts` 文件夹中存放的是布局容器，在 `layouts` 中新建一个扩展名为`.vue` 的文件在下面的 `views` 文件夹中需要有一个同名的文件夹与其对应，注册路由时会进行自动注册，其中`layouts` 做为`父路由`，与其对应的 `views` 文件夹下的除了 `component` 中所有扩展名为`.vue` 的文件会做为`子路由`

## tailwindcss 配置方式

1. `npm add -D tailwindcss postcss autoprefixer` 安装 tailwindcss 工具库和 postcss 工具库

2. `npx tailwindcss init -p` 会生成 `tailwind.config.js` 与 `postcss.config.js` 二者缺一不可

3. 在生成的 `tailwind.config.js` 中添加如下配置

```ts
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`
```

4. 在 `src` 目录下的 `plugins` 文件夹中新建 `tailwindcss` 文件夹与 `index.ts` 文件，在 `tailwindcss` 文件夹下新建` index.ts` 与 `tailwindcss.css` 文件，

5. 在 `tailwindcss` 文件夹下的 `index.ts` 中添加如下代码

```ts
import "./tailwindcss.css";
export function setupTailwindcss() {}
```

6. 在 `tailwindcss` 文件夹下的 `tailwindcss.css` 中添加如下代码 会对 HTML 样式进行初始化

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

7. 在 `src` 目录下的 `plugins` 文件夹中添加如下代码 完成插件挂载

```ts
import { App } from "vue";
import { setupTailwindcss } from "./tailwindcss";
export function setupPlugins(app: App) {
  setupTailwindcss();
}
```

8. 安装 `bradlc.vscode-tailwindcss` 插件，如果安装后没有代码提示则打开`设置`搜索`editor.quickSuggestions`，将 `strings` 设置为 `on`
