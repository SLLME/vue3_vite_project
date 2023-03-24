<template>
  <div class="app-container">

    <div class="operationDom">
      <Row :gutter="[0, 10]">
        <Button type="primary" @click="handleAddUser">添加</Button>
      </Row>
    </div>

    <LTable ref="lTable" :columns="columns" :data="data" :tableLoading="tableLoading"></LTable>

    <MyPagination v-model:page="queryParams.page" v-model:pageSize="queryParams.pageSize" :total="total"
      :pageSizeOptions="pageSizeOptions" @pagination="getList"></MyPagination>

    <Modal :visible="addUser.open" :title="addUser.title" :width="addUser.width" @ok="submitAddUser"
      @cancel="closeModel">
      <Form ref="addUserForm" :model="addUser.form" size="small" :labelCol="addUser.labelCol"
        :rules="addUser.rules">
        <FormItem label="税号" name="nsrsbh">
          <Input v-model:value="addUser.form.nsrsbh" placeholder="请输入税号，空时获取所有" />
        </FormItem>
        <FormItem label="发票日期" name="yearMonth">
          <DatePicker v-model:value="addUser.form.yearMonth" format="YYYY-MM" valueFormat="YYYY-MM" picker="month"
            style="width: 100%;" />
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script setup lang="ts" name="nsrsbh">
import { Button, Input, Checkbox, Form, FormItem, DatePicker, Row, message, Modal } from "ant-design-vue";
import { ElCheckbox } from "element-plus";
import LTable from "@/components/Table/table.vue"
import MyPagination from "@/components/Pagination/pagination.vue"

import { calcTableHeight } from "@/utils";


import {
  list, deleteById, insertNew
} from '@/api/nsrsbhs'
import { ResponseData } from "@/api/model/loginModel";
import { any } from "vue-types";
import { ObjectModel } from "@/api/model/objectModel";

const lTable = ref();

let tableHeight = ref<number>(0);
let tableWidth = ref<number>(0);
onMounted(() => {
  tableHeight.value = calcTableHeight();
  tableWidth.value = window.innerWidth - 40;

  getList();
})


let data = ref<ObjectModel[]>([]);
const columns = [
  {
    key: 'selection',
    dataKey: "selection",
    width: 50,
    cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        ElCheckbox,
        {
          modelValue: rowData.checked,
          onChange: () => { lTable.value.onCheckChange(rowData) },
        }
      )
    },
    headerCellRenderer: () => {
      return h(
        Checkbox,
        {
          indeterminate: lTable.value.indeterminate,
          onClick: lTable.value.onCheckAllChange,
          checked: lTable.value.allSelect
        }
      )
    }
  },
  {
    key: '0', dataKey: '', title: '序号', width: 50, cellRenderer: (rowData: ObjectModel) => {
      return h(
        'span', {}, (rowData.rowIndex + 1) + (queryParams.page - 1) * queryParams.pageSize
      )
    }
  },
  { key: '1', dataKey: "nsrsbh", title: '税号', width: 180 },
  { key: '2', dataKey: "nsrmc", title: '名称', width: 180 },
  { key: '4', dataKey: "createTime", title: '创建时间', width: 180 },
  { key: '6', dataKey: "updateTime", title: '更新时间', width: 180 },
]


const tableLoading = ref<boolean>(false);
const queryParams = reactive<any>({
  page: 1,
  pageSize: 100,
  invCode: null,
  invNo: null,
  startDate: null,
  endDate: null,
  invType: null,
  buyName: null,
  buyTaxNo: null,
  sellName: null,
  sellTaxNo: null,
  rangeDate: [],
})
const pageSizeOptions = ['50', '100', '500', '1000'];
let total = ref<number>(0);

/** 获取表格数据 */
const getList = async () => {
  tableLoading.value = true;
  let res: ResponseData = await list(queryParams);
  tableLoading.value = false;
  if (res.errcode == 0) {
    data.value = res.data.map((curr: any, index: number) => {
      curr.checked = false;
      curr.index = index;
      return curr;
    });
    total.value = res.data.length;
  }
}
/** 查询 */
const search = () => {
  queryParams.value.page = 1;
  getList();

}

/** 表格加载 */
var display = computed(() => {
  return tableLoading.value ? "block" : 'none'
})


/** 业务逻辑处理 */
/** 添加 */
const instance = getCurrentInstance();
const addUser = reactive<any>({
  open: false,
  title: '添加新用户',
  width: 400,
  labelCol: { style: { width: '80px' } },
  form: {
    nsrsbh: '',
    nsrmc: ''
  },
  rules: {
    nsrsbh: [
      { required: true, message: '税号不能为空' }
    ],
    nsrmc: [
      { required: true, message: '纳税人名称不能为空' }
    ]
  }
})
const handleAddUser = ()=>{
  addUser.open = true;
}

const addUserForm = ref();
const submitAddUser = ()=>{
  addUserForm.value.validate().then(async () => {
    instance?.proxy?.$Loading.show();
    let res: ResponseData = await insertNew(addUser.form);
    instance?.proxy?.$Loading.hide();
    if (res.errcode == 0) {
      message.success(res.errmsg);
      closeModel();
      getList();
    }
  }).catch(() => { });
}
const closeModel = ()=>{
  addUser.open = false;
  addUser.form = {
    nsrsbh: '',
    nsrmc: ''
  }
}
</script>
<script lang="ts">

</script>

<style scoped lang="scss">
:deep(.ant-form) {
  margin-bottom: 10px;
}
</style>