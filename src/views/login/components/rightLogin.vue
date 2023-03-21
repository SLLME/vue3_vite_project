<template>
  <div class="login-right">
    <div class="login-right-container">
      <form onsubmit="return false;" class="login-form">
        <div class="login-title">船新版本欢迎体验</div>
          <input type="text" placeholder="账号" class="form-input" v-model="loginParams.username" />
          <input type="password" placeholder="密码" class="form-input" v-model="loginParams.password" />
        <button class="form-button" @click="handleLogin">
          SIGN UP
        </button>
      </form>

      <div class="left-bottom-circle"></div>
      <div class="right-top-circle"></div>
    </div>
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from "pinia";
import { userMain } from "@/store/home";
import { LoginParams, ResponseData } from "@/api/model/loginModel";

const main = userMain();
const userRouter = useRouter();
let { headSculptureIndex } = storeToRefs(main);

const loginParams = reactive<LoginParams>({
  username: 'liangsy',
  password: 'Zsmm!@#64'
})
const handleLogin = async () => {
  if(!loginParams.username){
    return;
  }
  if(!loginParams.password){
    return;
  }
  let res: ResponseData = await main.login(loginParams);
  if(res.errcode == 0){
    userRouter.push("/invoiceRequest")
  }
}
</script>

<style scoped lang="scss">
.login-right {
  width: 40%;
  background-color: #ecf0f3;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-right-container {
    width: 480px;
    height: 320px;
    padding: 25px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
    position: relative;
    overflow: hidden;
    display: flex;
    justify-content: center;

    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .login-title {
        font-size: 20px;
        font-weight: 700;
        letter-spacing: 1.25px;
        margin-bottom: 20px;
      }
    }

    .form-input {
      width: 350px;
      height: 40px;
      margin: 4px 0;
      padding-left: 25px;
      font-size: 13px;
      letter-spacing: 0.15px;
      border: none;
      outline: none;
      background-color: #ecf0f3;
      border-radius: 8px;
      box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    }

    .form-input:focus {
      box-shadow: inset 4px 4px 4px #d1d9e6, inset -4px -4px 4px #f9f9f9;
    }

    .form-button {
      width: 180px;
      height: 50px;
      border-radius: 25px;
      font-weight: 700px;
      font-size: 14px;
      letter-spacing: 1.15px;
      background-color: #4b70e2;
      color: #f9f9f9;
      box-sizing: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
      border: none;
      outline: none;
      cursor: pointer;
      margin-top: 25px;
      transition: 2s;
    }

    .form-button:hover {
      box-shadow: inset 6px 6px 10px #b8bec7, inset -1px -1px 10px #fff;
      background: none;
      color: #4b70e2;
      font-weight: 700;
      transition: 1s;
    }

    .left-bottom-circle {
      position: absolute;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
      right: calc(100% - 100px);
      top: calc(100% - 100px);
      transform: rotate(2deg);
      transition: 1.25s;
    }

    .right-top-circle {
      position: absolute;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background-color: #ecf0f3;
      box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
      left: calc(100% - 60px);
      bottom: calc(100% - 60px);
      transform: rotate(2deg);
      transition: 1.25s;

    }
  }
}
</style>