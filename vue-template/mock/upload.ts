// test.ts

import { Random } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
export default [
  {
    url: '/api/uplpad/image',
    method: 'post',
    response: () => {
      return {
        code: 0,
        errno: 0, // 必须存在该参数
        message: '上传成功',
        status: 'success',
        data: {
          url: '/public/images/user.jpg',
        },
      };
    },
  },
] as MockMethod[];
