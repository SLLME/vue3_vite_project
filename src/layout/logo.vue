<template>
  <div class="logo-container">
    <img :src="logo" />
  </div>
</template>

<script setup lang="ts">
  import logo from "@/assets/logo/logo2.gif"
</script>

<style scoped>
.logo-container{
  margin-right: 10px;
}
  img{
    height: 32px;
  }
</style>