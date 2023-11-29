import * as yup from "yup";
yup.setLocale({
  mixed: {
    required: "${label}必须输入",
  },
  string: {
    email: "请输入正确的邮箱地址",
  },
  number: {},
});
export default yup;
