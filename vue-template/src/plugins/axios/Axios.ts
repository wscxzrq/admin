import axios, { AxiosRequestConfig } from 'axios';
import store from '@/utils/store';
import { CacheEnum } from '@/enum/cacheEnum';
import router from '@/router';
import errorStore from '@/store/errorStore';

export default class Axios {
  private instance; // 实例

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.interceptors();
  }

  public async request<T, D = ResponseResult<T>>(config: AxiosRequestConfig): Promise<D> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.instance.request<D>(config);
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * 调用拦截器函数
   */
  private interceptors() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  /**
   * 添加请求拦截器
   */
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      config => {
        // 在发送请求之前做些什么
        config.headers.set('Authorization', 'Bearer ' + store.get(CacheEnum.TOKEN_NAME) ?? '');
        return config;
      },
      error => {
        // 对请求错误做些什么
        return Promise.reject(error);
      },
    );
  }

  /**
   * 添加响应拦截器
   */
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      response => {
        // 2xx 范围内的状态码都会触发该函数。
        // 对响应数据做点什么
        return response;
      },
      error => {
        switch (error.response.status) {
          case 401:
            store.remove(CacheEnum.TOKEN_NAME);
            router.push({ name: 'login' });
            break;
          case 422:
            // 后台表单验证
            errorStore().errors = '';
            break;
        }
        return Promise.reject(error);
      },
    );
  }
}
