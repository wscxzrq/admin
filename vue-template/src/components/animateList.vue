<template>
  <!-- 列表动画组件 -->
  <div class="animate-list">
    <TransitionGroup appear :tag="props.tag" name="animate" @before-enter="beforeEnter" @enter="enter">
      <slot />
    </TransitionGroup>
  </div>
</template>

<script lang="ts" setup>
import articleApi from '@/api/article'
import { gsap } from "gsap";
import { RendererElement } from 'vue';

interface props {
  /**
   * 渲染标签
   */
  tag?:string
  /**
   * 动画持续时间
   */ 
  duration?:number
  /**
   * 动画延迟时间
   */
  delay?:number
}
const props = withDefaults(defineProps<props>(),{
  tag:undefined,
  duration:1,
  delay:.2
})
const articles = ref()
 articleApi.article().then(res => {
  articles.value = res.data
 })

 const beforeEnter = (el:RendererElement) => {
    gsap.set(el,{
      opacity:0
    })
 }

 const enter = (el:RendererElement) => {
  gsap.to(el,{
    opacity:1,
    duration:props.duration,
    delay:el.dataset.index * props.delay ?? 0,
  })
 }
</script>

<style lang="scss" scoped>
.animate-list {
  position: relative;
  .animate-leave-active {
    transition: all 1s ease;
    position: absolute;
    width: 100%;
  }
  .animate-move {
    transition: all 1s ease;
  }
}
</style>