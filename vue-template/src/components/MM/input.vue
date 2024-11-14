<template>
  <input type="text" placeholder="请输入手机号或邮箱" class="mm-input" :value="modelValue" @input="$emit('update:modelValue',($event.target as HTMLInputElement).value)">
</template>

<script lang="ts" setup>
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  });
</script>

<style lang="scss" scoped>
.mm-input {
  @apply border border-gray-300 placeholder:text-sm w-full rounded-md py-1 px-2
      outline-none focus:ring-2 ring-offset-2 ring-violet-600 duration-300 focus:border-white;
}
</style>