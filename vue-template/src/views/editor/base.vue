<template>
  <!-- <wangEditor :height="600" v-model="content"/> -->
  <WangEditorEditor :height="600" v-model="content"></WangEditorEditor>
</template>

<script lang="ts" setup>
// import wangEditor from '@/components/wangEditor/Editor.vue'
import { ref } from 'vue';

const content = ref('XT')
</script>

<style lang="scss" scoped>

</style>