import Axios from "./Axios";

const http = new Axios({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { http };
