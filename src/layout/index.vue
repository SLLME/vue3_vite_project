<template>
  <a-layout class="layout">
    <a-layout-header>
      <logo></logo>
      <a-menu v-model:selectedKeys="selectedKeys" mode="horizontal" :style="{ lineHeight: '64px' }" @click="menuChange">
        <template v-for="item in menuItemArr">
          <template v-if="item.children">
            <a-sub-menu key="sub1">
              <template #title>
                <IconFont :type="item.iconType"></IconFont>
                {{ $t(`${item.name}`) }}
              </template>
              <a-menu-item v-for="citem in item.children" :key="citem.key">
                <!-- <IconFont type="icon-tuichu" /> -->
                <IconFont :type="citem.iconType"></IconFont>
                {{ $t(`${citem.name}`) }}
              </a-menu-item>
            </a-sub-menu>
          </template>
          <template v-else>
            <a-menu-item :key="item.key">
              <!-- <IconFont type="icon-tuichu" /> -->
              <IconFont :type="item.iconType"></IconFont>
              {{ $t(`${item.name}`) }}
            </a-menu-item>
          </template>

        </template>

      </a-menu>
      <sidebar></sidebar>
    </a-layout-header>
    <a-layout-content>
      <a-breadcrumb class="breadcrumb-body">
        <a-breadcrumb-item>
          <template v-for="(breadcrumb, index) in breadcrumbArrComputed">
            <span v-if="index" style="padding: 0 10px;">/</span>{{ $t(breadcrumb) }}
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <section class="app-main">
        <router-view v-slot="{ Component }">
          <keep-alive>
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
import breadcrumb from 'ant-design-vue/lib/breadcrumb';

const menuItemArr = ref<MenuItem[]>([
  { name: "menuItem.item1", key: 'invoiceRequest', route: '/invoiceRequest', iconType: 'icon-fapiaoguiji' },
  { name: "menuItem.item2", key: 'uploadInvoice', route: '/uploadInvoice', iconType: 'icon-shangchuanfapiao' },
  { name: "menuItem.item3", key: 'uploadVehicleInvoice', route: '/uploadVehicleInvoice', iconType: 'icon-jidongche' },
  { name: "menuItem.item4", key: 'nsrsbhs', route: '/nsrsbhs', iconType: 'icon-shuihao' },
  { name: "menuItem.item5", key: 'manage', route: '/manage', iconType: 'icon-yonghuguanli' },
  {
    name: "menuItem.item6", key: 'test', route: '', iconType: 'icon-yonghuguanli', children: [
      { name: "menuItem.item7", key: 'slot', route: '/slot', iconType: 'icon-yonghuguanli' },
      { name: "menuItem.item8", key: 'depInject', route: '/depInject', iconType: 'icon-yonghuguanli' },
      { name: "menuItem.item9", key: 'directive', route: '/directive', iconType: 'icon-yonghuguanli' },
    ]
  }
]);
const selectedKeys = ref<string[]>(['1']);

const userRouter = useRouter();
const menuChange = ({ key, name }: any) => {
  breadcrumbArr.value = formatBreadcrumb(menuItemArr.value, key);
  userRouter.push('/' + key)
  // breadcrumbArr.value = menuItemArr.value[Number(key) - 1].name
}

function formatBreadcrumb(menuItemArr: MenuItem[], key: string): string {
  for (let i = 0; i < menuItemArr.length; i++) {
    if (menuItemArr[i].key == key) {
      return menuItemArr[i].name;
    }
    if (menuItemArr[i].children) {
      let name = formatBreadcrumb(menuItemArr[i].children as MenuItem[], key);
      if (name) {
        return menuItemArr[i].name + '/' + name;
      }
    }
  }
  return '';
}

const breadcrumbArr = ref<string>('发票归集');

onMounted(() => {
  selectedKeys.value = new Array(userRouter.currentRoute.value.name as string)
})
let breadcrumbArrComputed = computed(() => {
  return breadcrumbArr.value.split("/");
})

</script>
<style scoped lang="scss">
.layout {
  width: 100%;
  height: 100%;
}

.ant-layout-header {
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
.app-main {
  width: 100%;
  height: 100%;
  overflow: auto;
}

.ant-menu {
  width: 60%;
}

.ant-menu-dark.ant-menu-horizontal>.ant-menu-item:hover {
  /* background-color: yellow; */
  // color: #0960bd;
  color: #EF856D;
}

.ant-layout-footer {
  padding: 0 0 24px 0;
}

.breadcrumb-body {
  background: #f0f2f5;
  border-bottom: 2px solid white;
  padding: 5px 20px;
}
</style>
