<!-- 使用组件方式生成校验规则 -->
<template>
  <Form @submit="onSubmit">
    <Field name="account" label="账号" :rules="{required: true,email: true}" :validate-on-input="true" #default="{field,errorMessage}">
      <input v-bind="field">
      <hr>
      {{ errorMessage }}
    </Field>
    <br>

    <hr>
    <button class="border bg-violet-400 text-white">提交</button>
  </Form>
</template>

<script lang="ts" setup>
  import v from '@/plugins/validate'
  // const { From, Field } = v
  const {Field } = v

  const onSubmit = (values: any) => {
    console.log(values)
  }
</script> 

<style lang="scss" scoped>
div {
  @apply flex w-screen h-screen justify-center items-center bg-gray-800;
  input {
    @apply border-4 p-2 rounded-md border-violet-500 outline-none;
  }
}
</style>