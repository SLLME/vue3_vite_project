<template>
  <div>
    {{ name }}: {{ count }}次
    <hr/>
    <button @click="myChangeCount">+1</button>
    <button @click="myReverseCount">reverse</button>
  </div>
</template>

<script setup lang="ts">
const name = inject("name");
const count = inject("count");
const changeCount = inject("changeCount");
const reverseCount = inject("reverseCount");
function myChangeCount(){
  (changeCount as Function)();
}
function myReverseCount(){
  (reverseCount as Function)();
}
</script>

<style scoped>

</style>