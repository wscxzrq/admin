<template>
  <!-- 使用组件方式完成校验 -->
  <Form @submit="onSubmit" :validation-schema="schema" #default="{errors}">
    <div class="w-[720px] translate-y-32 md:translate-y-0 bg-white md:grid grid-cols-2 rounded-md overflow-hidden ">
      <div class="p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 class="text-center text-gray-700 text-lg">会员登录</h2>
          <div class="mt-8">
            <Field name="account" as="input" value="MM@163.com" label="账号" #default="{field}" class="mm-input" placeholder="请输入手机号或邮箱">
              <input v-bind="field">
            </Field>
            <div v-if="errors.account" class="mm-error">请输入手机号或邮箱</div>
            <!-- <ErrorMessage name="account" as="div" class="mm-error" /> -->
            <Field name="password" as="input" value="123" label="密码" #default="{field}" class="mm-input mt-3" type="password" placeholder="请输入密码">
              <input v-bind="field">
            </Field>
            <div v-if="errors.password" class="mm-error">{{ errors.password }}</div>
            <!-- <ErrorMessage name="password" as="div" class="mm-error" /> -->
          </div>
          <MMButton />
          <div class="flex justify-center mt-4">
            <MM-wechat theme="outline" size="24" fill="#ffffff" class="bg-green-600 rounded-full p-1 cursor-pointer" />
          </div>
        </div>
        <div class="flex gap-2 mt-5 justify-center">
          <mm-link />
          <mm-link />
          <mm-link />
          <mm-link />
        </div>
      </div>
      <div class="hidden md:block relative">
        <img src="/images/login.jpg" alt="" class="absolute h-full w-full object-cover">
      </div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
  import v from '@/plugins/validate';
  import { email, required } from '@vee-validate/rules';
  import { min } from 'lodash';
  import utils from '@/utils';
  const { Form, Field, ErrorMessage } = v;

  const schema = v.yup.object({
    account: v.yup.string().required().email().label('账号'),
    password: v.yup.string().required().min(3).label('密码'),
  });

  // const schema = {
  //   account: { required: true, email: true },
  //   password: { required: true, min: 3 }
  // }
  const onSubmit = async (values: any) => {
    utils.user.login(values);
  };
</script>
<script lang="ts">
  export default {
    // guest 标识是否是游客
    route: { name: 'login', meta: { guest: true } },
  };
</script>
<style lang="scss" scoped>
form {
  @apply bg-slate-300 h-screen flex justify-center items-start md:items-center p-5 md:p-0;
}
</style>