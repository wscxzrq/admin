import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router, { setupRouter } from "./router";

(async function bootstrap() {
  const app = createApp(App);
  setupRouter(app);
  // 当路由挂载完毕后在进行渲染组件
  await router.isReady();

  app.mount("#app");
})();
