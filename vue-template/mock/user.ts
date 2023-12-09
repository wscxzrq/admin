// test.ts

import { Random } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: ({ query }) => {
      return {
        code: 0,
        message: '成功',
        type: 'success',
        data: {
          name: 'Miss.XT',
          age: 18,
          avatar: '/images/user.JPG',
        },
      };
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: ({ query }) => {
      return {
        code: 0,
        message: '登录成功',
        type: 'success',
        data: {
          token: Random.string(10),
        },
      };
    },
  },
] as MockMethod[];
