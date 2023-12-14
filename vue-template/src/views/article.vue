<template>
  <div class="article">
    <animate-list tag="ul" :duration="3" :delay="1">
      <li v-for="(item,index) of articles" :key="item.id" @click="del(index)" :data-index="index" >
        {{ item.title }}
      </li>
    </animate-list>
  </div>
</template>

<script lang="ts" setup>
import articleApi from '@/api/article'

const articles = ref()
 articleApi.article().then(res => {
  articles.value = res.data
 })
 
 const del = (index: number) => {
  articles.value.splice(index,1)
 }
</script>

<style lang="scss" scoped>
.article {
  padding: 30px;
  position: relative;
  ul {
    li {
      @apply p-5 mb-10 text-white;
      background-color: #8e44ad;
      border-radius: 5px;
    }
  }
}

.animate-leave-active {
  transition: all 1s ease;
  position: absolute;
  width: 100%;
}

.animate-move {
  transition: all 1s ease;
}
</style>