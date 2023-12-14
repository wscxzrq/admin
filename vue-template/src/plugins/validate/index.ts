import * as veeValidate from 'vee-validate';
import rules from '@vee-validate/rules';
import { loadLocaleFromURL, localize } from '@vee-validate/i18n';
import zh_CN from '@vee-validate/i18n/dist/locale/zh_CN.json';
import yup from '../yup';

// 批量注册验证规则
Object.keys(rules).forEach(key => {
  veeValidate.defineRule(key, rules[key]);
});

/**
 * 定义多语言
 * 分两种方式，第一种需要引入一个语言包，第二种使用 CDN 方式可以减少文件体积
 */

veeValidate.configure({
  // validateOnInput: true, // 全局文本在input 行为发生时验证
  generateMessage: localize('zh_CN', zh_CN),
});
// loadLocaleFromURL(
//   "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_CN.json"
// );

/**
 * 批量添加响应式数据
 * @param fields 响应式字段数组
 */
const useFields = (fields: string[]) => {
  fields.forEach(field => veeValidate.useField(field));
};
export default { yup, ...veeValidate, useFields };
