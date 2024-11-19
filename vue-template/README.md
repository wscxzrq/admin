# 使用指南

1. 本项目使用 `vite` + `Vue3` 的 `Composition` API

## 创建步骤

1. `node` 版本使用 `14`及以上 `14`版本 `node` 可以正常启动但是关闭会报错，建议使用 `16`版本 如没有安装 `nvm node` 版本控制请`移步` [Mac OS M1 ITerm2、Nvm、node、npm、cnpm 配置过程](https://juejin.cn/post/7278575483909865483)。

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

19. `npm add @types/echarts` 安装 Echarts 类型声明

20. `npm add @element-plus/icons-vue` 安装 element icon 图标库

21. `npm add -D rollup-plugin-visualizer` 安装用于生成项目的可视化分析报告。它能够创建一个交互式的饼图，展示打包后的代码大小分布。

22. `npm add -D unplugin-vue-components unplugin-auto-import` 安装 elementui 按需引入插件

23 `npm add gsap` 安装动画库

24 `npm add echarts` 安装图表库

25. `npm add animate.css` 安装 animate.css 动画库

26. `npm add @toast-ui/editor` 安装 markdown 编辑器

27. `npm install @wangeditor/editor --save` `npm install @wangeditor/editor-for-vue@next --save` 安装富文本编辑器

28. `npm add @icon-park/vue-next` 安装图标库

## 项目结构

全局安装 `npm install mddir -g` 使用 mddir 命令进行结构树生成 会在根目录下生成 `directoryList.md` 文件

`````bash
|-- admin `项目名称`
    |-- .env `环境变量文件`
    |-- .gitignore git `忽略文件`
    |-- .prettierrc `代码格式化配置文件`
    |-- README.md `项目说明文件`
    |-- directoryList.md `目录文件`
    |-- index.html `入口文件`
    |-- package-lock.json `项目依赖文件`
    |-- package.json `项目依赖文件`
    |-- postcss.config.js `css `预处理器配置文件``
    |-- stats.html `打包结果文件`
    |-- tailwind.config.js `css `预处理器配置文件``
    |-- tsconfig.json` ts `配置文件``
    |-- tsconfig.node.json `ts `配置文件``
    |-- vite.config.ts `vite `配置文件``
    |-- .vscode `vscode `配置文件``
    |   |-- settings.json `vscode `配置文件``
    |-- mock `mock `模拟数据文件``
    |   |-- article.ts `模拟文章接口`
    |   |-- upload.ts `模拟上传接口`
    |   |-- user.ts `模拟用户数据接口`
    |-- public `静态资源文件`
    |   |-- vite.svg `项目图表`
    |   |-- images `图片资源`
    |       |-- home.jpg `首页图片`
    |       |-- login.jpg `登录图片`
    |       |-- logo.jpg `logo `图片``
    |       |-- user.jpg `用户头像`
    |-- src 源码文件
    |   |-- App.vue `根组件`
    |   |-- main.ts `主入口文件`
    |   |-- api `接口文件`
    |   |   |-- article.ts `文章接口`
    |   |   |-- uploadApi.ts `上传接口`
    |   |   |-- userApi.ts  `用户信息接口`
    |   |-- assets `资源文件`
    |   |-- components `组件文件`
    |   |   |-- animateList.vue `列表动画组件`
    |   |   |-- breadcrumb.vue `面包屑组件`
    |   |   |-- notification.vue `通知组件`
    |   |   |-- MM `表单组件`
    |   |   |   |-- button.vue `按钮组件`
    |   |   |   |-- error.vue `错误消息组件`
    |   |   |   |-- input.vue `输入框组件`
    |   |   |   |-- link.vue `链接组件`
    |   |   |-- markdown markdown `组件`
    |   |   |   |-- editor.vue  `toast `编辑器``
    |   |   |   |-- toastEditor.ts `toast `编辑器配置``
    |   |   |-- wangEditor `富文本编辑器`
    |   |       |-- Editor-old.vue `4.0富文本编辑器`
    |   |       |-- Editor.vue `5.0富文本编辑器`
    |   |       |-- wangEditor.ts `4.0富文本编辑器配置`
    |   |-- composables `全局方法`
    |   |   |-- menu.ts `菜单全局方法`
    |   |-- enum `枚举`
    |   |   |-- ApiENum.ts `接口枚举`
    |   |   |-- cacheEnum.ts `缓存信息枚举`
    |   |-- layouts `布局`
    |   |   |-- admin.vue `后台布局主文件`
    |   |   |-- auth.vue `其他布局`
    |   |   |-- editor.vue `其他布局`
    |   |   |-- errors.vue `其他布局`
    |   |   |-- admin `后台布局组件库`
    |   |       |-- historyLink.vue `历史纪录组件`
    |   |       |-- menu.vue `菜单组件`
    |   |       |-- navbar.vue `导航组件`
    |   |-- plugins `插件`
    |   |   |-- index.ts `全局注册插件`
    |   |   |-- yup.ts `校验插件`
    |   |   |-- axios `axios `请求插件``
    |   |   |   |-- Axios.ts `拦截器方法`
    |   |   |   |-- index.ts `注册 `axios``
    |   |   |-- element-icon `element-ui图标插件`
    |   |   |   |-- index.ts `注册` element-u `图标插件```
    |   |   |-- elementui `element-ui `组件插件``
    |   |   |   |-- index.ts `导入 `element-ui `组件```
    |   |   |-- iconpark `字节图标库`
    |   |   |   |-- index.ts `引入字节图标库`
    |   |   |-- pinia `全局状态组件`
    |   |   |   |-- index.ts `注册全局状态组件`
    |   |   |-- tailwindcss `tailwindcss `库``
    |   |   |   |-- index.ts `注册 `tailwindcss `css `库````
    |   |   |   |-- tailwindcss.css `tailwindcss `默认样式``
    |   |   |-- validate `表单校验库`
    |   |       |-- index.ts `注册表单校验库`
    |   |-- router `路由`
    |   |   |-- guard.ts `路由守卫`
    |   |   |-- index.ts `注册路由`
    |   |   |-- routes.ts `默认路由`
    |   |   |-- autoload `自动注册路由`
    |   |   |   |-- index.ts `自动注册路由`
    |   |   |   |-- module.ts `根据模块自动注册路由`
    |   |   |   |-- view.ts `根据后台数据自动注册路由`
    |   |   |-- module `模块路由`
    |   |       |-- admin.ts `工作台路由`
    |   |       |-- editor.ts `编辑器路由`
    |   |       |-- errors.ts `错误页面路由`
    |   |-- store `全局状态管理`
    |   |   |-- errorStore.ts `错误消息管理`
    |   |   |-- userStore.ts `用户信息管理`
    |   |-- style `全局样式`
    |   |   |-- global.scss `全局样式`
    |   |-- utils `工具类`
    |   |   |-- env.ts `环境变量工具类`
    |   |   |-- index.ts `注册所有工具类`
    |   |   |-- store.ts `对缓存进行 `设置 `获取 `删除````
    |   |   |-- user.ts `登录工具类`
    |   |-- views `视图`
    |       |-- article.vue `列表动画使用示例`
    |       |-- home.vue `主页`
    |       |-- admin `后台管理`
    |       |   |-- echarts.ts `Echarts `配置信息``
    |       |   |-- home.vue `工作台`
    |       |   |-- component `组件文件`
    |       |       |-- to.vue `组件示例`
    |       |-- auth `登录页面`
    |       |   |-- login.vue `使用配置方式完成校验`
    |       |   |-- login_old.vue `使用组件方式完成校验`
    |       |-- editor `编辑器`
    |       |   |-- markdown.vue `markdown `编辑器``
    |       |   |-- wangeditor.vue `wangeditor `编辑器``
    |       |-- errors
    |           |-- 403.vue `错误页面`
    |           |-- 404.vue `错误页面`
    |           |-- 500.vue `错误页面`
    |-- types `类型定义`
    |   |-- ResponseResult.d.ts `响应结果`
    |   |-- auto-imports.d.ts `自动导入`
    |   |-- components.d.ts `自动注册组件`
    |   |-- custom-types.d.ts `wangEditor `类型声明进行扩展``
    |   |-- menu.ts `菜单类型定义`
    |   |-- module.d.ts .vue ts `如何处理`
    |   |-- router.ts `路由元信息类型定义`
    |   |-- typings.d.ts `toastui `wangEditor@4.0 `类型扩展```
    |   |-- viteEnv.d.ts `环境变量类型扩展`
    |-- vite `vite` 配置``
        |-- alias.ts `别名`
        |-- util.ts `环境变量类型转换`
        |-- plugins `vite `插件``
            |-- autuImport.ts `自动导入插件`
            |-- index.ts `对插件统一注册`
            |-- mock.ts `mock `插件``
`````

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
import './tailwindcss.css';
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
import { App } from 'vue';
import { setupTailwindcss } from './tailwindcss';
export function setupPlugins(app: App) {
  setupTailwindcss();
}
```

8. 安装 `bradlc.vscode-tailwindcss` 插件，如果安装后没有代码提示则打开`设置`搜索`editor.quickSuggestions`，将 `strings` 设置为 `on`
