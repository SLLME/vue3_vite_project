<template>
  <div class="app-container">
    <Form id="queryForm" ref="queryForm" :model="queryParams" size="small" layout="inline">
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
    </Form>

    <el-table-v2 :columns="columns" :data="data" :width="tableWidth" :height="tableHeight" fixed>
      <template #overlay>
        <div class="overlay-container" v-show="tableLoading">
          <Space><a-spin size="large" /></Space>
        </div>
      </template>
    </el-table-v2>

    <MyPagination v-model:page="queryParams.page" v-model:pageSize="queryParams.pageSize" :total="total"
      :pageSizeOptions="pageSizeOptions" @pagination="getList"></MyPagination>
  </div>
</template>

<script setup lang="ts" name="uploadVehicleInvoice">
import { Button, Select, Input, RangePicker, Checkbox, Space, Form, DatePicker, Row, Col, SelectOption, Pagination } from "ant-design-vue";
import { ElCheckbox } from "element-plus";
import MyPagination from "@/components/Pagination/pagination.vue"

import { calcTableHeight } from "@/utils";


import { list } from "@/api/uploadVehicleInvoice";
import { ResponseData } from "@/api/model/loginModel";
import { any } from "vue-types";
import { ObjectModel } from "@/api/model/objectModel";

let tableHeight = ref<number>(0);
let tableWidth = ref<number>(0);
onMounted(() => {
  tableHeight.value = calcTableHeight();
  tableWidth.value = window.innerWidth - 40;

  getList();
})
const indeterminate = ref<boolean>(false);
const allSelect = ref<boolean>(false);


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
          onChange: () => { onCheckChange(rowData) },
        }
      )
    },
    headerCellRenderer: () => {
      return h(
        Checkbox,
        {
          indeterminate: indeterminate.value,
          onClick: onCheckAllChange,
          checked: allSelect.value
        }
      )
    }
  },
  {
    key: '0', dataKey: '', title: '序号', width: 50, cellRenderer: (rowData: ObjectModel) => {
      return h(
        'span', {}, (rowData.rowIndex + 1)  +  (queryParams.page - 1) * queryParams.pageSize
      )
    }
  },
  { key: '1', dataKey: "code", title: '发票代码', width: 180 },
  { key: '2', dataKey: "number", title: '发票号码', width: 180 },
  {
    key: '3', dataKey: "status", title: '发票状态', width: 180, cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'span', {}, invStatusOptions[rowData.status]
      )
    }
  },
  { key: '4', dataKey: "date", title: '开票日期', width: 180 },
  {
    key: '5', dataKey: "type", title: '发票类型', width: 180, cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'span', {}, invTypeOptions[rowData.type]
      )
    }
  },
  { key: '6', dataKey: "tax", title: '税额', width: 180 },
  { key: '7', dataKey: "pretax_amount", title: '不含税金额', width: 180 },
  { key: '8', dataKey: "total", title: '价税合计', width: 180 },
  { key: '9', dataKey: "buyer", title: '购方名称', width: 180 },
  { key: '10', dataKey: "buyer_tax_id", title: '购方税号', width: 180 },
  { key: '11', dataKey: "seller", title: '销方名称', width: 180 },
  { key: '12', dataKey: "seller_tax_id", title: '销方税号', width: 180 },
]

const onCheckAllChange = (e: any) => {
  data.value.forEach(curr => {
    curr.checked = e.target.checked;
  })
  indeterminate.value = false;
  allSelect.value = e.target.checked;
}
const onCheckChange = (rowData: any) => {
  indeterminate.value = true;
  data.value[rowData.index].checked = !rowData.checked
  /** 
   * 全选
   * 全不选
   * 混合
   *  */
  let all = data.value.every(curr => {
    return curr.checked
  })
  let none = data.value.every(curr => {
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
const invTypeOptions: ObjectModel = {
  '0': '专票',
  '1': '电票',
  '2': '普票',
  '3': '电子专票',
  '81': '全电专票',
  '82': '全电普票'
};
const invStatusOptions: ObjectModel = {
  '02': '红冲',
  '03': '作废',
  '01': '正常',
  '04': '失控'
};
/** 日期改变 */
const dateRangeChange = (_date: any, dateString: string[]) => {
  queryParams.value.rangeDate = dateString;
}
/** 获取表格数据 */
const getList = async () => {
  tableLoading.value = true;
  let res: ResponseData = await list(queryParams);
  tableLoading.value = false;
  if (res.errcode == 0) {
    data.value = res.data.list.map((curr: any, index: number) => {
      curr.checked = false;
      curr.index = index;
      return curr;
    });
    total.value = res.data.total;
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
</script>
<script lang="ts">

</script>

<style scoped lang="scss">
:deep(.ant-form) {
  margin-bottom: 10px;
}

.pagination-container {
  text-align: right;
  padding: 10px 20px;
}

:deep(.el-table-v2__overlay) {
  display: v-bind('display');
}
</style>