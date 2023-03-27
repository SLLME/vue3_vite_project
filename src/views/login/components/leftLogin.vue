<template>
  <div class="login-left">
    <h2>请选择您的头像</h2>
    <div class="login-left-img">
      <template v-for="(item, index) in headImgArr">
        <img :src="item" :class="(index + 1) == currHeadSculpture ? 'select-img' : ''" @click="handleClickHead(index)">
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { userMain } from "@/store/home";

import { headImgArr } from "@/utils/headImg";
const main = userMain();
let { headSculptureIndex } = storeToRefs(main);


let currHeadSculpture = $ref<number>(1);
let transformTime = setInterval(() => {
  currHeadSculpture = (currHeadSculpture + 1) > 12 ? (currHeadSculpture + 1) % 12 : currHeadSculpture + 1
}, 1500)
const handleClickHead = (index: number) => {
  clearInterval(transformTime);
  currHeadSculpture = index + 1;
  headSculptureIndex.value = index + 1
}
</script>

<style scoped lang="scss">
.login-left {
  width: 40%;
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;

  h2 {
    width: 20px;
    font-weight: 800;
    margin: 0 20px;
    color: white;
  }

  .login-left-img {
    display: flex;
    flex-wrap: wrap;

    img {
      // position: absolute;
      // width: 128px;
      // margin: 20px;
      width: 20%;
      margin: 2%;
      border-radius: 50%;
      cursor: pointer;
      // top: 0;
      // animation: imgDown 10s infinite;
      box-shadow: 2px 2px 10px yellow, -2px -2px 10px red;
    }

    .select-img {
      border: 9px solid #ff8d00;
    }
  }
}

@media screen and (max-width: 800px) {
  .login-left{
    display: none!important;
  }
}
</style>