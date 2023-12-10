import userApi, { User } from '@/api/userApi';
import { defineStore } from 'pinia';

export default defineStore('user', {
  state: () => {
    return {
      /**
       * 用户信息
       */
      info: {} as null | User,
    };
  },

  actions: {
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const res = await userApi.info();
      this.info = res.data;
    },
  },
});
