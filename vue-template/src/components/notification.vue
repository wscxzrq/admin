<template>
  <!-- 消息通知组件 -->
  <div class="notification" >
    <el-icon @click.stop="show = !show" class="mt-[6px]">
      <ChatDotRound />
    </el-icon>
    <el-tabs v-model="activeName" class="lists" v-show="show" @click.stop>
      <el-tab-pane label="系统通知" name="site">
        <a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam aspernatur aliquam quod</a>
        <a href="">numquam velit. Numquam similique voluptatem eum tempore aperiam asperiores, nam iusto obcae</a>
        <a href="">cati ratione, magni quisquam fugiat id explicabo!</a>
      </el-tab-pane>
      <el-tab-pane label="站内消息" name="message">Config</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { nextTick } from 'process';
import { ref } from 'vue';

const activeName = ref('site');
const show = ref(false);

nextTick(() => {
  document.documentElement.addEventListener('click', () => {
    show.value = false;
  })
})
</script>

<style lang="scss" scoped>
.notification {
  @apply relative;
  .lists {
    @apply absolute bg-white px-3 py-2 border rounded-md shadow-md right-[-20px]  z-10 w-[300px] text-sm;
    a {
      @apply truncate overflow-hidden block border-b pb-2 my-2 hover:text-blue-500;
    }
  }
}
</style>