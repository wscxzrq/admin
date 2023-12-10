<template>
  <Editor v-model="content" :height="300" placeholder="请输入内容"/>  
</template>

<script lang="ts" setup>
import Editor from '@/components/markdown/editor.vue';
import { ref } from 'vue';
const content = ref('XT')
</script>

<style lang="scss" scoped>

</style>