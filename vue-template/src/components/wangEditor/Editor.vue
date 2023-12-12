<template>
  <div id="div1">
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from 'vue';
import wangEditor from './wangEditor';
interface IProps {
  /**
   * 编辑器高度
   */
  height?:number
  /**
   * 编辑器内容
   */
  modelValue:string
  /**
   * 上传图片地址
   */
  uploadImgServer?:string
}
const props = withDefaults(defineProps<IProps>(),{
  height: 300,
  modelValue:'',
  uploadImgServer: '/api/uplpad/image'
})
const emit = defineEmits(['update:modelValue'])
nextTick(() => {
  new wangEditor('#div1',(newHtml:string) => {
    emit('update:modelValue',newHtml)
  },props)
}) 
</script>

<style lang="scss" scoped>

</style>