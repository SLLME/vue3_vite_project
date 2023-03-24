<template>
  <div class="app-container">
    <!-- <Form id="queryForm" ref="queryForm" :model="queryParams" size="small" layout="inline">
      <Row style="width: 100%;" :gutter="[10, 10]">
        <Col :span="4">
        <Form.Item label="发票代码">
          <Input v-model:value="queryParams.invCode" placeholder="请输入发票代码" />
        </Form.Item>
        </Col>
        <Col :span="4">
        <Form.Item label="发票号码">
          <Input v-model:value="queryParams.invNo" placeholder="请输入发票号码" />
        </Form.Item>
        </Col>
        <Col span="4">
        <Form.Item label="发票类型">
          <Select v-model:value="queryParams.invType">
            <SelectOption v-for="(v, k, i) in invTypeOptions" :value="k">{{ v }}</SelectOption>
          </Select>
        </Form.Item>
        </Col>
        <Col :span="4">
        <Form.Item label="购方名称">
          <Input v-model:value="queryParams.buyName" placeholder="请输入购方名称" />
        </Form.Item>
        </Col>
        <Col :span="4">
        <Form.Item label="购方税号">
          <Input v-model:value="queryParams.buyTaxNo" placeholder="请输入购方税号" />
        </Form.Item>
        </Col>
        <Col :span="4">
        <Form.Item label="销方名称">
          <Input v-model:value="queryParams.sellName" placeholder="请输入销方名称" />
        </Form.Item>
        </Col>
        <Col :span="4">
        <Form.Item label="销方税号">
          <Input v-model:value="queryParams.sellTaxNo" placeholder="请输入销方税号" />
        </Form.Item>
        </Col>
        <Col span="4">
        <Form.Item>
          <Button @click="search">查询</Button>
        </Form.Item>
        </Col>
      </Row>
    </Form> -->

    <div class="operationDom">
      <Row :gutter="[0, 10]">
        <Button type="primary" @click="handleAddUser">添加用户</Button>
      </Row>
    </div>

    <LTable ref="lTable" :columns="columns" :data="data" :tableLoading="tableLoading"></LTable>

    <MyPagination v-model:page="queryParams.page" v-model:pageSize="queryParams.pageSize" :total="total"
      :pageSizeOptions="pageSizeOptions" @pagination="getList"></MyPagination>

    <Modal :visible="addUser.open" :title="addUser.title" :width="addUser.width" @ok="submitAddUser" @cancel="closeModel">
      <Form ref="addUserForm" :model="addUser.form" size="small" :labelCol="addUser.labelCol" :rules="addUser.rules">
        <FormItem label="用户名" name="username">
          <Input v-model:value="addUser.form.username" placeholder="请输入税号，空时获取所有" />
        </FormItem>
        <FormItem label="用户密码" name="password">
          <Input v-model:value="addUser.form.password" placeholder="请输入税号，空时获取所有" />
        </FormItem>
        <FormItem label="权限" name="permissions">
          <CheckboxGroup v-model:value="addUser.form.permissions">
            <Row>
              <Col :span="6">
              <Checkbox value="1">发票归集</Checkbox>
              </Col>
              <Col :span="6">
              <Checkbox value="2">上传的发票</Checkbox>
              </Col>
              <Col :span="6">
              <Checkbox value="3">上传的机动车发票</Checkbox>
              </Col>
              <Col :span="6">
              <Checkbox value="4">税号</Checkbox>
              </Col>
              <Col :span="6">
              <Checkbox value="5">边界发票</Checkbox>
              </Col>
              <Col :span="6">
              <Checkbox value="6">边界的机动车发票</Checkbox>
              </Col>
              <Col :span="6">
              <Checkbox value="7">系统管理</Checkbox>
              </Col>
            </Row>
          </CheckboxGroup>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script setup lang="ts" name="manager">
import { Button, Input, Checkbox, Form, DatePicker, Row, message, Modal, FormItem, CheckboxGroup, Col } from "ant-design-vue";
import { ElCheckbox } from "element-plus";
import LTable from "@/components/Table/table.vue"
import MyPagination from "@/components/Pagination/pagination.vue"

import { calcTableHeight } from "@/utils";


import {
  getAllUsers, deleteUser, addUser
} from '@/api/login'
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
  { key: '1', dataKey: "username", title: '用户名', width: 180 },
  { key: '2', dataKey: "permission", title: '权限', width: 180 },
  {
    key: '4', dataKey: "createTime", title: '操作', width: 180, align: 'center',
    cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'div', {}, [
        h(
          Button, { type: 'link', size: 'small', onClick: () => { handleDeleteUser(rowData) } }, { default: () => '删除' }
        )
      ]
      )
    },
  },
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
  let res: ResponseData = await getAllUsers();
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
const instance = getCurrentInstance();
const handleDeleteUser = async (rowData: ObjectModel) => {
  instance?.proxy?.$Loading.show();
  let res: ResponseData = await deleteUser({
    username: rowData.username
  })
  instance?.proxy?.$Loading.hide();
  if (res.errcode == 0) {
    message.success(`用户【${rowData.username}】已被删除`);
    getList();
  }
}
/** 添加 */
const addUser = reactive<any>({
  open: false,
  title: '添加新用户',
  width: 800,
  labelCol: { style: { width: '80px' } },
  form: {
    username: '',
    password: '',
    permissions: []
  },
  rules: {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' }
    ],
    permissions: [
      { required: true, message: '请选择权限', trigger: 'blur' }
    ]
  }
})
const handleAddUser = () => {
  addUser.open = true;
}

const addUserForm = ref();
const submitAddUser = () => {
  addUserForm.value.validate().then(async () => {
    instance?.proxy?.$Loading.show();
    let res: ResponseData = await addUser(addUser.form);
    instance?.proxy?.$Loading.hide();
    if (res.errcode == 0) {
      message.success(res.errmsg);
      closeModel();
      getList();
    }
  }).catch(() => { });
}
const closeModel = () => {
  addUser.open = false;
  addUser.form = {
    username: '',
    password: '',
    permissions: []
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