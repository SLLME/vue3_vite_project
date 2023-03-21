<template>
  <a-layout class="layout">
    <a-layout-header>
      <logo></logo>
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :style="{ lineHeight: '64px' }"
        @click="menuChange">
        <a-menu-item v-for="item in menuItemArr" :key="item.key">
          <!-- <IconFont type="icon-tuichu" /> -->
          <IconFont :type="item.iconType"></IconFont>
          {{ item.name }}
        </a-menu-item>
      </a-menu>
      <sidebar></sidebar>
    </a-layout-header>
    <a-layout-content>
      <!-- <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>{{ breadcrumbArr }}</a-breadcrumb-item>
      </a-breadcrumb> -->
      <section class="app-main">
        <router-view v-slot="{ Component }">
          <keep-alive include="Home,News">
            <component class="view" :is="Component" />
          </keep-alive>
        </router-view>
      </section>

      <!-- <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div> -->
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2023 Created by AKA
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts" setup>

// import { createFromIconfontCN } from '@ant-design/icons-vue';


import { useRouter, useRoute } from 'vue-router';
import Logo from './logo.vue';
import sidebar from './sidebar.vue';
import { MenuItem } from './menuItem';

const menuItemArr = ref<MenuItem[]>([
  { name: "发票归集", key: 'invoiceRequest', route: '/invoiceRequest', iconType: 'icon-fapiaoguiji' },
  { name: "上传的发票", key: 'uploadInvoice', route: '/uploadInvoice', iconType: 'icon-shangchuanfapiao' },
  { name: "上传的机动车发票", key: 'uploadVehicleInvoice', route: '/uploadVehicleInvoice', iconType: 'icon-jidongche' },
  { name: "税号", key: 'nsrsbhs', route: '/nsrsbhs', iconType: 'icon-shuihao' },
  { name: "用户管理", key: 'manage', route: '/manage', iconType: 'icon-yonghuguanli' }
]);
const selectedKeys = ref<string[]>(['1']);

const userRouter  = useRouter();
const menuChange = ({ key }: any) => {
  userRouter.push('/' + key)
  // breadcrumbArr.value = menuItemArr.value[Number(key) - 1].name
}

const breadcrumbArr = ref<string>('发票归集');

onMounted(()=>{
  selectedKeys.value = new Array(userRouter.currentRoute.value.name as string)
})

</script>
<style>

.layout{
  width: 100%;
  height: 100%;
}
.ant-layout-header{
  display: flex;
  background-color: white;
  padding-right: 20px;
}
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}

/** router-view */
.app-main{
  width: 100%;
  height: 100%;
  overflow: auto;
}
.ant-menu{
  width: 60%;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover{
  /* background-color: yellow; */
  color: #0960bd;

}
.ant-layout-footer{
  padding: 0 0 24px 0;
}
</style>
