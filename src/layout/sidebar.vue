<template>
  <div class="sidebar-container">

    <IconFont class="icon-font" type="icon-buju" @click="handleBujuClick"></IconFont>
    <Setting ref="layoutSetting"></Setting>

    <div class="split-div"></div>

    <Dropdown placement="bottomRight">
      <IconFont class="icon-font" type="icon-zhongyingwenyuyan"></IconFont>
      <template #overlay>
        <Menu>
          <Menu.Item>
            <span class="menu-span" @click="changeLangue('zh')">
              <IconFont class="icon-font-mini" type="icon-zhongwen"></IconFont>
              中文
            </span>
          </Menu.item>
          <Menu.Item>
            <span class="menu-span" @click="changeLangue('en')">
              <IconFont class="icon-font-mini" type="icon-yingwen"></IconFont>
              English
            </span>
          </Menu.item>
        </Menu>
      </template>
    </Dropdown>

    <div class="split-div"></div>

    <Dropdown placement="bottomRight">
      <img :src="headImgArr[headSculptureIndex - 1]" />
      <template #overlay>
        <Menu>
          <Menu.Item>
            <span class="menu-span" @click="logout">
              <IconFont type="icon-exit"></IconFont>
              退出系统
            </span>
          </Menu.item>
        </Menu>
      </template>
    </Dropdown>
  </div>
</template>

<script setup lang="ts">
import { Dropdown, Menu, Modal } from 'ant-design-vue';

import Setting from './components/Setting.vue';

import { headImgArr } from '@/utils/headImg';

import { storeToRefs } from 'pinia';
import { userMain } from '@/store/home';
import { ResponseData } from '@/api/model/loginModel';
import { useI18n } from 'vue-i18n';
const { locale } = useI18n();

const main = userMain();
let { headSculptureIndex } = storeToRefs(main);
const userRouter = useRouter();
const logout = async () => {
  Modal.warning({
    content: "确定退出系统吗？",
    centered: true,
    okText: "确定",
    onOk: async () => {
      let res: ResponseData = await main.logout();
      if (res.errcode == 0) {
        userRouter.push("/")
      }
    }
  })
}

const changeLangue = (type: string) => {
  locale.value = type;
}

const layoutSetting = ref();

const handleBujuClick = () => {
  layoutSetting.value.layoutSettingShow();
}

</script>

<style scoped lang="scss">
.sidebar-container {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
  }

  .split-div::before {
    content: "";
    display: block;
    width: 1px;
    height: 30px;
    margin: 0 10px;
    background: #adadad;
    transform: rotate(12deg);
  }
}

.menu-span {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 80px;
}

.icon-font {
  font-size: 30px;
  cursor: pointer;
}

.icon-font-mini {
  font-size: 18px;
  cursor: pointer;
}
</style>