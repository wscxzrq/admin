import userApi, { User } from '@/api/userApi';
import { CacheEnum } from '@/enum/cacheEnum';
import store from '@/utils/store';
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
      // 如果存在 token 则获取用户信息
      if (store.get(CacheEnum.TOKEN_NAME)) {
        const res = await userApi.info();
        this.info = res.data;
      }
    },
  },
});
