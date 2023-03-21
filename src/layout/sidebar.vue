<template>
  <div class="sidebar-container">
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
import { headImgArr } from '@/utils/headImg';

import { storeToRefs } from 'pinia';
import { userMain } from '@/store/home';
import { ResponseData } from '@/api/model/loginModel';
const main = userMain();
let { headSculptureIndex } = storeToRefs(main);
const userRouter = useRouter();
const logout = async ()=>{
  Modal.warning({
    content: "确定退出系统吗？",
    centered: true,
    okText: "确定",
    onOk: async ()=>{
      let res: ResponseData = await main.logout();
      if(res.errcode == 0){
        userRouter.push("/")
      }
    }
  })
}
</script>

<style scoped lang="scss">
.sidebar-container {
  flex-grow: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    border-radius: 5px;
    cursor: pointer;
  }

  .menu-span {
    display: block;
    width: 200px;
  }
}
</style>