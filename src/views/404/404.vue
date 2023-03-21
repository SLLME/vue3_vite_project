<template>
  <div class="app-container">
    <img :src="errorImg" />
    <Button @click="userRouter.push('/')">返回首页</Button>
  </div>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import errorImg from "../../assets/404/404.svg" 
const userRouter = useRouter();
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
  }
  button{
    align-self: flex-end;
    margin-bottom: 6%;
  }
}
</style>