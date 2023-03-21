import { createRouter, createWebHistory } from "vue-router";

const Layout = () => import("../layout/index.vue");
let routes = [
  {
    path: '/login',
    component: () => import("../views/login/login.vue"),
    name: "login"
  },
  {
    path: '',
    component: Layout,
    redirect: '/login',
    children: [
      {
        path: '/invoiceRequest',
        name: 'invoiceRequest',
        component: () => import('../views/invoiceRequest/index.vue'),
        meta: { title: '发票归集' }
      },
      {
        path: '/nsrsbhs',
        name: 'nsrsbhs',
        component: () => import('../views/nsrsbhs/index.vue'),
        meta: { title: '税号' }
      },
      {
        path: '/manage',
        name: 'manage',
        component: () => import('../views/Manage/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: '/uploadInvoice',
        name: 'uploadInvoice',
        component: () => import('../views/uploadInvoice/index.vue'),
        meta: { title: '上传的发票' }
      },
      {
        path: '/uploadVehicleInvoice',
        name: 'uploadVehicleInvoice',
        component: () => import('../views/uploadVehicleInvoice/index.vue'),
        meta: { title: '上传的机动车发票' }
      },
    ]
  },
  {
    path: '/404',
    component: () => import('../views/404/404.vue'),
  },
  {
    path: '/:pathMatch(.*)', redirect: '/404'
  }
]
// 路由
const router = createRouter({
  history: createWebHistory(),
  routes
})
// 导出
export default router 