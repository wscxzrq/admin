import _ from 'lodash';
/**
 * 解析 env 环境变量工具函数 （Node环境）
 * @param env 环境变量
 */
export function parseEnv(env: Record<string, any>): ImportMetaEnv {
  const envs: any = _.cloneDeep(env);
  Object.entries(env).forEach(([key, value]) => {
    if (value == 'true' || value == 'false') {
      envs[key] = value == 'true' ? true : false;
    } else if (/^\d+$/.test(value)) {
      // 处理数字
      envs[key] = +value;
    } else if (value == 'null') envs[key] = null;
    else if (value == 'undefined') envs[key] = undefined;
  });
  return envs;
}
