<template>
  <div class="xt-error" v-show="props.error">{{ props.error }}</div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    error: String,
  });
</script>

<style lang="scss" scoped>
</style>