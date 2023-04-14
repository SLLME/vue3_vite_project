<template>
  <!-- 依赖注入 -->
  <div>
    <son></son>
  </div>
</template>

<script setup lang="ts">
import son from './son.vue';
provide("name", "乌鸦坐飞机")

let count = ref<number>(0);
provide("count", count);
function changeCount():void{
  count.value++;
}

function reverseCount():void{
  count.value = 0;
}

provide("changeCount", changeCount);
provide("reverseCount", reverseCount);
</script>

<style scoped>

</style>