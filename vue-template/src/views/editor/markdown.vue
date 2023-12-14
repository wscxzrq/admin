<template>
  <markdown v-model="content" :height="300" placeholder="请输入内容" />
</template>

<script lang="ts" setup>
  import markdown from '@/components/markdown/editor.vue';
  const content = ref('');
</script>

<style lang="scss" scoped>
</style>