<template>
  <form @submit="onSubmit">
    <div class="w-[720px] translate-y-32 md:translate-y-0 bg-white md:grid grid-cols-2 rounded-md overflow-hidden ">
      <div class="p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 class="text-center text-gray-700 text-lg">会员登录</h2>
          <div class="mt-8">
            <XTInput v-model="values.account" />
            <XTError :error="errors.account" />
            <XTInput v-model="values.password" class="mt-1" />
            <XTError :error="errors.password" />
            <!-- <Field name="account" as="input" value="XT@163.com" label="账号" #default="{field}" class="xt-input" placeholder="请输入手机号或邮箱">
              <input v-bind="field">
            </Field>
            <div v-if="errors.account" class="xt-error">请输入手机号或邮箱</div> -->
            <!-- <ErrorMessage name="account" as="div" class="xt-error" /> -->
            <!-- <Field name="password" as="input" value="123" label="密码" #default="{field}" class="xt-input mt-3" type="password" placeholder="请输入密码">
              <input v-bind="field">
            </Field>
            <div v-if="errors.password" class="xt-error">{{ errors.password }}</div> -->
            <!-- <ErrorMessage name="password" as="div" class="xt-error" /> -->
          </div>
          <XTButton />
          <div class="flex justify-center mt-4">
            <XT-wechat theme="outline" size="24" fill="#ffffff" class="bg-green-600 rounded-full p-1 cursor-pointer" />
          </div>
        </div>
        <div class="flex gap-2 mt-5 justify-center">
          <XT-link />
          <XT-link />
          <XT-link />
          <XT-link />
        </div>
      </div>
      <div class="hidden md:block relative">
        <img src="/images/login.jpg" alt="" class="absolute h-full w-full object-cover">
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import v from '@/plugins/validate';
  import { email, required } from '@vee-validate/rules';
  import { min } from 'lodash';
  import utils from '@/utils';
  const { yup, useForm, useFields } = v;

  const schema = yup.object({
    account: yup.string().required().email().label('账号'),
    password: yup.string().required().min(3).label('密码'),
  });

  // const schema = {
  //   account: { required: true, email: true },
  //   password: { required: true, min: 3 }
  // }
  const { errors, handleSubmit, values } = useForm({
    initialValues: {
      account: 'xiaotong@163.com',
      password: '123131',
    }, // 初始数据
    validationSchema: schema, // 验证规则
  });

  // 批量添加响应式数据
  useFields(Object.keys(schema));

  const onSubmit = handleSubmit(async (values: any) => {
    utils.user.login(values);
  });
</script>
<style lang="scss" scoped>
form {
  @apply bg-slate-300 h-screen flex justify-center items-start md:items-center p-5 md:p-0;
}
</style>