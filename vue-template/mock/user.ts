// test.ts

import { Random } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/user/info',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: '成功',
        status: 'success',
        data: {
          name: 'Miss.XT',
          age: 18,
          avatar: '/images/user.JPG',
          permissions: ['editor_markdown', 'article_edit', 'base_editor'],
        },
      };
    },
  },
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return {
        code: 0,
        message: '登录成功',
        status: 'success',
        data: {
          token: Random.string(10),
        },
      };
    },
  },
] as MockMethod[];
