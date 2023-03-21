<template>
  <!-- 全局加载组件 -->
  <div class="loading-animation-div" v-show="isShow">
    <div id="loading">
      <div class="base">
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
        <div class="cube"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Loadinganimation">
const isShow = ref<boolean>(false);

const show = () => {
  isShow.value = true;
}
const hide = () => {
  isShow.value = false;
}
defineExpose({
  show,
  hide
})
</script>

<style scoped lang="scss">
.loading-animation-div {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  opacity: 0.3;
  z-index: 99999;
}

#loading {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
}

.base {
  height: 9rem;
  /*padding: 3rem;*/
  width: 9rem;
  transform: rotateX(45deg) rotateZ(45deg);
  transform-style: preserve-3d;
}

.cube,
.cube:after,
.cube:before {
  content: '';
  float: left;
  height: 3rem;
  position: absolute;
  width: 3rem;
}

.cube {
  background-color: #000000;
  position: relative;
  transform: translateZ(3em);
  transform-style: preserve-3d;
  transition: .25s;
  box-shadow: 6em 7em 2em rgb(90 75 177 / 46%);

  animation: anim 1s infinite;
}

.cube:after {
  background-color: #049dbc;
  transform: rotateX(-90deg) translateY(3em);
  transform-origin: 100% 100%;
}

.cube:before {
  background-color: #048ca7;
  transform: rotateY(90deg) translateX(3em);
  transform-origin: 100% 0;
}

.cube:nth-child(1) {
  animation-delay: 0.05s;
}

.cube:nth-child(2) {
  animation-delay: 0.1s;
}

.cube:nth-child(3) {
  animation-delay: 0.15s;
}

.cube:nth-child(4) {
  animation-delay: 0.2s;
}

.cube:nth-child(5) {
  animation-delay: 0.25s;
}

.cube:nth-child(6) {
  animation-delay: 0.3s;
}

.cube:nth-child(7) {
  animation-delay: 0.35s;
}

.cube:nth-child(8) {
  animation-delay: 0.4s;
}

.cube:nth-child(9) {
  animation-delay: 0.45s;
}

.loading-msg {
  padding: 35px 25px;
  color: #00acc1;
  top: 150px;
  position: absolute;
  font-size: 20px;
  width: 200px;
}

@keyframes anim {
  50% {
    transform: translateZ(0.5em);
  }
}
</style>
