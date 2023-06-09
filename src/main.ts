import { createApp, App as VueApp } from 'vue'
import App from './App.vue'

import "./style/index.scss"
// import "ant-design-vue/dist/antd.css"  // ant css
import 'ant-design-vue/dist/antd.variable.min.css' // ant CSS Variable
import 'element-plus/dist/index.css'

import "nprogress/nprogress.css"; // 路由加载进度条
// import 'element-plus/es/components/base/style/css'
// import 'element-plus/es/components/table-v2/style/css'

import { registerGlobComp } from './components/registerGlobComp'
import "dayjs/locale/zh-cn";

import Antd from "ant-design-vue"

import router from './router'
import "./permission"


import loadingAnimation from "@/components/LoadingAnimation/index"

type Loading = {
  show: ()=> void,
  hide: ()=> void
}

declare module 'vue'{
  /** 扩展组件实例类型用于支持自定义全局属性 */
  export interface ComponentCustomProperties{
    $Loading: Loading
  }
}

/** 使用IconFont图标 */
import { createFromIconfontCN } from '@ant-design/icons-vue';
const IconFont = createFromIconfontCN({
  scriptUrl: import.meta.env.VITE_ICONFONT_URL
});

/** 使用pinia */
import { createPinia } from 'pinia'

/** 使用国际化 */
import i18n from './i18n'

import ElementPlus from "element-plus"

import { setupGlobDirectives } from './directive'

const app = createApp(App);

/** 绑定全局自定义指令 */
setupGlobDirectives(app);

app.component("IconFont", IconFont);

app.use(router);
app.use(Antd);
// app.use(registerGlobComp);
// app.use(useTable);
app.use(ElementPlus);
app.use(createPinia());
app.use(loadingAnimation);
app.use(i18n);
app.mount("#app");
