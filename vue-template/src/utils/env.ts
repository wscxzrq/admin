import _ from 'lodash';
/**
 * 组件中环境变量无法获得正确的类型 （浏览器环境）
 */
const env: any = _.cloneDeep(import.meta.env);
Object.entries(import.meta.env as Record<string, any>).forEach(([key, value]) => {
  if (value == 'true' || value == 'false') {
    env[key] = value == 'true' ? true : false;
  } else if (/^\d+$/.test(value)) {
    // 处理数字
    env[key] = +value;
  } else if (value == 'null') env[key] = null;
  else if (value == 'undefined') env[key] = undefined;
});

export default env as ViteEnv;
