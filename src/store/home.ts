import { LoginParams, ResponseData } from "@/api/model/loginModel"
import { defineStore } from "pinia"
import { message } from "ant-design-vue"
import { removeToken, setToken } from "@/utils/auth"
import { login, logout } from "@/api/login"

export const userMain = defineStore("main", {
  state: ()=>{
    return {
      headSculptureIndex: 1,
      token: '',
    }
  },
  getters: {

  },
  actions: {
    async login(LoginParams:LoginParams){
      let res: ResponseData = await login(LoginParams);
      if(res.errcode == 0){
        this.token = res.data.token
        setToken(res.data.token);
      }
      return res;
    },

    async logout(){
      let res: ResponseData = await logout();
      if(res.errcode == 0){
        this.token = "";
        removeToken();
      }
      return res;
    }
  }
})