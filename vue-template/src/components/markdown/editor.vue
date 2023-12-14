<template>
  <div id="markdownEditor"></div>
</template>

<script lang="ts" setup>
import { nextTick } from 'process';
import ToastEditor from './toastEditor'

interface IProps {
  modelValue?: string;
  height?:number;
  placeholder?:string;
}
const props = withDefaults(defineProps<IProps>(),{
  modelValue: '',
  height: 500,
  placeholder: '请输入内容'
})  

const emit = defineEmits(['update:modelValue'])
nextTick(() => {
  const toastUi = new ToastEditor('#markdownEditor',`${props.modelValue}`,`${props.height}px`);
  toastUi.editor.on('change',(type:string) => {
    emit('update:modelValue',toastUi.editor[type == 'markdown'? 'getMarkdown' : 'getHTML']())
  }) 
})
</script>

<style lang="scss">
@import 'https://uicdn.toast.com/editor/latest/toastui-editor.min.css';
#editor {
  @apply bg-white;
  .toastui-editor-mode-switch {
    display: none !important;
  }

  .fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
  }
}
</style>