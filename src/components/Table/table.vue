<template>
  <el-table-v2 :columns="columns" :data="data" :width="tableWidth" :height="tableHeight" fixed>
    <template #overlay>
      <div class="overlay-container" v-show="tableLoading">
        <Space><Spin size="large" /></Space>
      </div>
    </template>
  </el-table-v2>
</template>

<script setup lang="ts" name="LTable">
import { ObjectModel } from "@/api/model/objectModel";

import { calcTableHeight } from "@/utils/index"
import { defineProps, defineExpose } from "vue";

import { Space, Spin } from "ant-design-vue";

const props = defineProps({
  columns: {
    type: Array as any,
    default: []
  },
  data: {
    type: Array, 
    default: []
  },
  tableLoading: {
    type: Boolean,
    default: false
  }
})

let tableData: any = toRef(props, "data");
const indeterminate = ref<boolean>(false);
const allSelect = ref<boolean>(false);

let tableHeight = ref<number>(0);
let tableWidth = ref<number>(0);
onMounted(() => {
  tableHeight.value = calcTableHeight();
  tableWidth.value = window.innerWidth - 40;
})

const onCheckAllChange = (e: any) => {
  tableData.value.forEach((curr: any) => {
    curr.checked = e.target.checked;
  })
  indeterminate.value = false;
  allSelect.value = e.target.checked;
}
const onCheckChange = (rowData: any) => {
  indeterminate.value = true;
  tableData.value[rowData.index].checked = !rowData.checked
  /** 
   * 全选
   * 全不选
   * 混合
   *  */
  let all = tableData.value.every((curr: any) => {
    return curr.checked
  })
  let none = tableData.value.every((curr: any) => {
    return !curr.checked;
  })
  if (!all && !none) {
    indeterminate.value = true;
    allSelect.value = false;
  } else {
    indeterminate.value = false;
    allSelect.value = all;
  }


}
defineExpose({
    onCheckAllChange, // 全选事件
    onCheckChange,  // 单选事件
    allSelect, // 全选状态
    indeterminate // 全选框
  })
</script>

<style scoped></style>