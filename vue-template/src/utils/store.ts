import { isJSDocNonNullableType } from 'typescript';
// 定时删除 token
export interface IData {
  expire?: number;
  data: any;
}
export default {
  /**
   * 设置 token
   * @param key 存储的key
   * @param data 存储的数据
   * @param expire 过期时间
   */
  set(key: string, data: any, expire?: number): void {
    let cache: IData = { data };
    if (expire) {
      cache.expire = new Date().getTime() + expire;
    }

    localStorage.setItem(key, JSON.stringify(cache));
  },
  /*
   * 获取token
   * @param key 存储的key
   */
  get(key: string): any {
    const cacheStore = localStorage.getItem(key);
    if (cacheStore) {
      const cache = JSON.parse(cacheStore);
      const expire = cache.expire;
      if (expire && expire < new Date().getTime()) {
        localStorage.removeItem(key);
        return null;
      }
      return cache.data;
    }
    return null;
  },

  /*
   * 删除 token
   * @param key 存储的key
   */
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
