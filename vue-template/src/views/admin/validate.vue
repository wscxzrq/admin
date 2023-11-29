<!-- 使用API 编程方式生成校验 -->
<template>
  <div>
    <form @submit="onsubmit">
      <input type="text" v-model="usernameValue">
      <p class="error">{{ errors.username }}</p>
      <br>
      <input type="text" v-model="passWordValue">
      <p class="error">{{ errors.password }}</p>
      <br>
      <button class="border bg-violet-400 text-white">提交</button>
    </form>
  </div>

</template>

<script lang="ts" setup>
  import v from '@/plugins/validate'
  const { handleSubmit, errors } = v.useForm({
    initialValues: {
      username: '晓彤',
      password: ''
    },
    validationSchema: {
      username: v.yup.string().required().email().label('账号'),
      password: { required: true }
    }
  })
  const { value: usernameValue } = v.useField('username', {}, { label: '用户名' })
  const { value: passWordValue } = v.useField('password', {}, { label: '密码' })

  const onsubmit = handleSubmit((value) => {
    console.log('value', value)
  })
</script>

<style lang="scss" scoped>
div {
  @apply flex w-screen h-screen justify-center items-center bg-gray-800;
  input {
    @apply border-4 p-2 rounded-md border-violet-500 outline-none;
  }
  .error {
    @apply text-red-500;
  }
}
</style>