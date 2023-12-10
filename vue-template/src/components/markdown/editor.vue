<template>
  <div id="editor"></div>
</template>

<script lang="ts" setup>
import { nextTick } from 'process';
import ToastEditor from './toastEditor'

interface IProps {
  modelValue?: string;
  height?:number;
  placeholder?:string;
}
const props = defineProps()
nextTick(() => {
  new ToastEditor('#editor','300px','123')
})
</script>

<style lang="scss" scoped>
@import 'https://uicdn.toast.com/editor/latest/toastui-editor.min.css';
#editor {
  @apply bg-white;
}
</style>