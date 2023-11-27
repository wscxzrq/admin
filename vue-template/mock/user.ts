// test.ts

import { Random } from "mockjs";
import { MockMethod } from "vite-plugin-mock";
export default [
  {
    url: "/api/info",
    method: "get",
    response: ({ query }) => {
      return {
        code: 0,
        message: "成功",
        type: "success",
        data: {
          name: "vben",
          age: 18,
          avater: "/avatr/xj.jpg",
        },
      };
    },
  },
  {
    url: "/api/login",
    method: "get",
    response: ({ query }) => {
      return {
        code: 0,
        message: "登录成功",
        type: "success",
        data: {
          token: Random.string(10),
        },
      };
    },
  },
] as MockMethod[];
