import NProgress from "nprogress"

import router from "./router";
import { getToken } from "./utils/auth";

NProgress.configure({ showSpinner: false });
const whiteList = ['/login']

router.beforeEach((to, from, next)=>{
  NProgress.start();
  console.log(to, from);
  next();
})

router.afterEach(()=>{
  NProgress.done()
})