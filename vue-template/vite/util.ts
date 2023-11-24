import _ from "lodash";
/**
 * 解析 env 环境变量工具函数
 * @param env 环境变量
 */
export function parseEnv(env: Record<string, any>) {
  const envs = _.cloneDeep(env);
  Object.entries(env).forEach(([key, value]) => {
    if (value == "true" || value == "false") {
      envs[key] = value == "true" ? true : false;
    }

    if (/^\d+$/.test(value)) {
      envs[key] = +value;
    }
  });
  return envs;
}
