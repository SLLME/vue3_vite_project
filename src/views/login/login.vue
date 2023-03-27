<template>
  <div class="login-container">
    <leftLogin></leftLogin>
    <rightLogin></rightLogin>
  </div>
</template>

<script setup lang="ts">
import leftLogin from './components/leftLogin.vue';
import rightLogin from './components/rightLogin.vue';
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;
  // min-width: 1158px;
  display: flex;
  justify-content: space-around;
  /** 字体无法选中 */
  user-select: none;
  background-color: #ecf0f3;

  
}

.login-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-left: -45%;
  background: url(/src/assets/logo/login-bg.svg);
  background-position: 100%;
  background-repeat: no-repeat;
  animation: rightMove 5s;
}

@keyframes rightMove {
  0% {
    margin-left: 0%;
  }

  100% {
    margin-left: -45%;
  }
}

</style>