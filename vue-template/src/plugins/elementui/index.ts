import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { App, createApp } from 'vue';

export default function setupElementPlus(app: App) {
  app.use(ElementPlus);
}
