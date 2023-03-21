import type { App, VNode } from "vue"

import LoadingAnimation from "./loadinganimation.vue"

import { createVNode, render } from "vue"
/**
 * 全局加载动画插件
 * 对象形式（必须有install）和函数形式
 */
export default {
  install(app: App){
    /** 通过组件创建虚拟dom */
    const vNode:VNode = createVNode(LoadingAnimation);
    /** 把虚拟dom渲染到页面上 */
    render(vNode, document.body);
    app.config.globalProperties.$Loading = {
      show: vNode.component?.exposed?.show,
      hide: vNode.component?.exposed?.hide
    }
  }
}
