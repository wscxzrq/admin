<template>
  <div>
    <ul>
      <li v-for="(item,index) of article" :key="index">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import articleApi from '@/api/article'

 const {data:article} = await articleApi.article();
 console.log('res',article)
</script>

<style lang="scss" scoped>

</style>