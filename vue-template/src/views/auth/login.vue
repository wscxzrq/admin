<template>
  <Form @submit="onSubmit" :validation-schema="schema" #default="{errors}">
    <div class="w-[720px] translate-y-32 md:translate-y-0 bg-white md:grid grid-cols-2 rounded-md overflow-hidden ">
      <div class="p-6 shadow-md flex flex-col justify-between">
        <div>
          <h2 class="text-center text-gray-700 text-lg">会员登录</h2>
          <div class="mt-8">
            <Field name="account" as="input" value="XT@163.com" label="账号" #default="{field}" class="xt-input" placeholder="请输入手机号或邮箱">
              <input v-bind="field">
            </Field>
            <div v-if="errors.account" class="xt-error">请输入手机号或邮箱</div>
            <!-- <ErrorMessage name="account" as="div" class="xt-error" /> -->
            <Field name="password" as="input" value="123" label="密码" #default="{field}" class="xt-input mt-3" type="password" placeholder="请输入密码">
              <input v-bind="field">
            </Field>
            <div v-if="errors.password" class="xt-error">{{ errors.password }}</div>
            <!-- <ErrorMessage name="password" as="div" class="xt-error" /> -->
          </div>
          <xt-button />
          <div class="flex justify-center mt-4">
            <i class="fa-brands fa-weixin bg-green-600 text-white rounded-full p-1 cursor-pointer"></i>
          </div>
        </div>
        <div class="flex gap-2 mt-5 justify-center">
          <xt-link />
          <xt-link />
          <xt-link />
          <xt-link />
        </div>
      </div>
      <div class="hidden md:block relative">
        <img src="/images/login.jpg" alt="" class="absolute h-full w-full object-cover">
      </div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
  import userApi from '@/api/userApi';
  import v from '@/plugins/validate';
  import { email, required } from '@vee-validate/rules';
  import { min } from 'lodash';
  import stroe from '@/utils/store';
  import router from '@/router';
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
    const {
      data: { token },
    } = await userApi.login(values);
    stroe.set('token', {
      token,
      expire: 1000 * 60 * 60 * 24,
    });
    router.push({ name: 'home' });
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