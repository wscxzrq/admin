import { createApp } from 'vue';
import App from './App.vue';
import router, { setupRouter } from './router';
import { setupPlugins } from './plugins';
import '@/style/global.scss';
import 'animate.css';
import 'ol/css';
(async function bootstrap() {
  const app = createApp(App);
  setupPlugins(app);
  setupRouter(app);

  // 当路由挂载完毕后在进行渲染组件
  await router.isReady();
  app.mount('#app');
})();
