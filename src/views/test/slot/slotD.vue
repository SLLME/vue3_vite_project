<template>
  <!-- 作用域插槽 -->
  <div>
    <slot :person="person" namea="name不会传递给插槽"></slot>
  </div>
</template>

<script setup lang="ts" name="SlotD">
const person = ref({
  name: '李XX',
  age: 'xxx'
})
</script>

<style scoped></style>