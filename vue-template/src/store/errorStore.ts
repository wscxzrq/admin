import { defineStore } from 'pinia';
// 错误消息仓库
export default defineStore('error', {
  state: () => {
    return {
      /**
       * 错误消息
       */
      errors: '' as string,
    };
  },

  actions: {},
});
