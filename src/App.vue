<template>
  <ConfigProvider :locale="locale">
    <div class="body-content">
    <RouterView/>
  </div>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import 'dayjs/locale/zh-cn'
import locale from 'ant-design-vue/lib/locale/zh_CN';
</script>

<style scoped>
  .body-content{
    width: 100%;
    height: 100%;
  }
</style>