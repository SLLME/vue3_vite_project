import type { App, DirectiveBinding } from "vue"

const focus = {
  mounted: (el: HTMLElement, binding: DirectiveBinding)=>{
    el.focus()
  }
}

export function setupFocusDirective(app: App){
  app.directive('focus', focus);
}