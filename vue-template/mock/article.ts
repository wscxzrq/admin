// test.ts

import { Random } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/article',
    method: 'get',
    response: () => {
      return {
        code: 0,
        message: '成功',
        status: 'success',
        data: new Array(10).fill('').map((_article, index) => {
          return {
            id: index,
            title: Random.ctitle(),
            content: Random.cparagraph(),
          };
        }),
      };
    },
  },
] as MockMethod[];
