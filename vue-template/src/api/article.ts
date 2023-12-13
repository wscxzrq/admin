import { http } from '@/plugins/axios';
export interface Article {
  id: string;
  title: string;
  content: string;
}
class articleApi {
  article() {
    return http.request<Article>({
      url: 'article',
      method: 'get',
    });
  }
}

export default new articleApi();
