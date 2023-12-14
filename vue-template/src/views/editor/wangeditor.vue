<template>
  <WangEditorEditor :height="600" v-model="content" placeholder="请输入内容"></WangEditorEditor>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const content = ref('XT');
</script>

<style lang="scss" scoped>
</style>