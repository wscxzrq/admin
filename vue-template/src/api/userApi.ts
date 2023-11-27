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

  login() {
    return http.request<Login>({
      url: "login",
      method: "get",
    });
  }
}

export default new userApi();
