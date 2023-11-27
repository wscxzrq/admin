# 使用指南

1. 本项目使用 `Vue3` 版本与 `Composition` API

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
15. `npm add element-plus` 安装 element-plus 组件库
16. `npm add -D @types/element-plus` 安装 element

## 项目结构

全局安装了 mddir 可以直接使用 mddir 命令进行结构树生成

## 新建页面注意事项

- `layouts` 文件夹中存放的是布局容器，在 `layouts` 中新建一个扩展名为`.vue` 的文件在下面的 `views` 文件夹中需要有一个同名的文件夹与其对应，注册路由时会进行自动注册，其中`layouts` 做为`父路由`，与其对应的 `views` 文件夹下的除了 `component` 中所有扩展名为`.vue` 的文件会做为`子路由`
