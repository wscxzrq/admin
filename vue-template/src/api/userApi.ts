import { http } from "@/plugins/axios";
interface User {
  name: string;
  age: number;
  avatar: string;
}
interface Login {
  token: string;
}
class userApi {
  info() {
    return http.request<User>({
      url: "info",
      method: "get",
    });
  }

  login(data: any) {
    return http.request<Login>({
      url: "login",
      method: "post",
      data,
    });
  }
}

export default new userApi();
