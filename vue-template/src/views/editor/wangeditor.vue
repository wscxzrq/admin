<template>
  <WangEditorEditor :height="1000" v-model="content" placeholder="请输入内容"></WangEditorEditor>
</template>

<script lang="ts" setup>
  const content = ref('MM');
</script>

<style lang="scss" scoped>
</style>