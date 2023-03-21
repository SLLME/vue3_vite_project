<template>
  <div class="app-container">
    <Form id="queryForm" ref="queryForm" :model="queryParams" size="small" layout="inline">
      <Row style="width: 100%;" :gutter="[10, 10]">
        <Col span="6">
        <Form.Item label="发票日期">
          <RangePicker v-model:value="rangeDate" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" @change="dateRangeChange">
          </RangePicker>
        </Form.Item>
        </Col>
        <Col span="4">
        <Form.Item label="发票类型">
          <Select v-model:value="queryParams.invType">
            <SelectOption v-for="(v, k, i) in invTypeOptions" :value="k">{{ v }}</SelectOption>
          </Select>
        </Form.Item>
        </Col>
        <Col span="4">
        <Form.Item label="重新申请">
          <Select v-model:value="queryParams.rerequest">
            <SelectOption :value="true">是</SelectOption>
            <SelectOption :value="false">否</SelectOption>
          </Select>
        </Form.Item>
        </Col>
        <Col span="4">
        <Form.Item label="拉取结果">
          <Select v-model:value="queryParams.flag">
            <SelectOption :value="0">未拉取</SelectOption>
            <SelectOption :value="1">成功</SelectOption>
            <SelectOption :value="2">失败</SelectOption>
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
        <Col span="4">
        <Form.Item>
          <Button @click="search">查询</Button>
        </Form.Item>
        </Col>
      </Row>
    </Form>

    <div class="operationDom">
      <Row :gutter="[0, 10]">
        <Button type="primary" @click="handleAddNewRequest">新增采集</Button>
      </Row>
    </div>


    <LTable ref="lTable" :columns="columns" :data="data" :tableLoading="tableLoading"></LTable>

    <MyPagination v-model:page="queryParams.page" v-model:pageSize="queryParams.pageSize" :total="total"
      :pageSizeOptions="pageSizeOptions" @pagination="getList"></MyPagination>

    <Modal :visible="addRequest.open" :title="addRequest.title" :width="addRequest.width" @ok="submitAddNewRequest"
      @cancel="closeModel">
      <Form ref="addRequestForm" :model="addRequest.form" size="small" :labelCol="addRequest.labelCol"
        :rules="addRequest.rules">
        <FormItem label="税号" name="nsrsbh">
          <Input v-model:value="addRequest.form.nsrsbh" placeholder="请输入税号，空时获取所有" />
        </FormItem>
        <FormItem label="发票日期" name="yearMonth">
          <DatePicker v-model:value="addRequest.form.yearMonth" format="YYYY-MM" valueFormat="YYYY-MM" picker="month"
            style="width: 100%;" />
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script setup lang="ts" name="InvoiceRequest">

import {
  Button, Select, Input, RangePicker, Checkbox, Form, Row, Col, SelectOption,
  Modal, DatePicker,
  FormItem,
  message
} from "ant-design-vue";
import dayjs, { Dayjs } from 'dayjs';

import { ElCheckbox, TableV2FixedDir } from "element-plus";

import MyPagination from "@/components/Pagination/pagination.vue"
import LTable from "@/components/Table/table.vue"
import { getCurrentInstance } from "vue";

import { doRequest, list, fetch, rerequest } from '@/api/invoicerequest'
import { list as listNsrsbhs } from '@/api/nsrsbhs'

import { ResponseData } from "@/api/model/loginModel";
import { ObjectModel } from "@/api/model/objectModel";
import { InvoiceRequestListParams } from "@/api/model/invoiceRequestModel";

type RangeValue = [Dayjs, Dayjs];

const lTable = ref();
const nsrsbhs: ObjectModel = {};
onMounted(async () => {
  let nsrsbhsRes: ResponseData = await listNsrsbhs({});
  if (nsrsbhsRes.errcode == 0) {
    for (const obj of nsrsbhsRes.data) {
      nsrsbhs[obj.nsrsbh] = obj.nsrmc
    }
  }
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
  {
    key: '1', dataKey: "fplx", title: '发票类型', width: 180, cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'span', {}, invTypeOptions[rowData.fplx]
      )
    }
  },
  { key: '2', dataKey: "kprqq", title: '开票起始', width: 180 },
  {
    key: '3', dataKey: "kprqz", title: '开票结束', width: 180,
  },
  { key: '4', dataKey: "msg", title: '结果消息', width: 180 },
  {
    key: '5', dataKey: "sqrq", title: '申请日期', width: 180,
  },
  {
    key: '6', dataKey: "sjlx", title: '数据类型', width: 180, cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'span', {}, rowData.sjlx == '2' ? '销项' : '进项'
      )
    }
  },
  { key: '7', dataKey: "nsrsbh", title: '税号', width: 180 },
  {
    key: '8', dataKey: "nsrmc", title: '名称', width: 180, cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'span', {}, nsrsbhs[rowData.nsrsbh]
      )
    }
  },
  { key: '9', dataKey: "requuid", title: '请求编号', width: 180 },
  { key: '10', dataKey: "rwh", title: '任务号', width: 180 },
  {
    key: '11', dataKey: "flag", title: '获取结果', width: 180, cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'span', {}, () => {
          if (rowData.flag === 0) {
            return '未获取'
          } else if (rowData.flag === 1) {
            return '成功'
          } else if (rowData.flag === 2) {
            return '失败'
          } else {
            return rowData.flag
          }
        }
      )
    }
  },
  {
    key: '12', dataKey: "rerequest", title: '需重新申请', width: 180, cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'span', {}, rowData.rerequest ? '是' : '否'
      )
    }
  },
  { key: '12', dataKey: "zipResultJson", title: '文件明细', width: 180 },
  { key: '12', dataKey: "createTime", title: '创建日期', width: 180 },
  { key: '12', dataKey: "updateTime", title: '更新日期', width: 180 },
  { key: '12', dataKey: "createBy", title: '创建人', width: 180 },
  {
    key: '13', dataKey: 'operation', title: '操作', width: 180, align: 'center',
    cellRenderer: ({ rowData }: ObjectModel) => {
      return h(
        'div', {}, [
        h(
          Button, { type: 'link', size: 'small', onClick: () => { doFetch(rowData) } }, { default: () => '拉取' } // 默认插槽推荐使用函数
        ),
        h(
          Button, { type: 'link', size: 'small', onClick: () => { doRerequest(rowData) } }, { default: () => "重新申请" }
        )
      ]
      )
    },
    fixed: TableV2FixedDir.RIGHT
  }
]

const tableLoading = ref<boolean>(false);
const queryParams = reactive<InvoiceRequestListParams>({
  page: 1,
  pageSize: 100,
  invType: undefined,
  rerequest: undefined,
  flag: undefined,
  buyName: undefined,
  buyTaxNo: undefined,
  kprqq: undefined,
  kprqz: undefined,
})
let rangeDate = ref<RangeValue>([dayjs(), dayjs()]);
const pageSizeOptions = ['50', '100', '500', '1000'];
let total = ref<number>(0);
const invTypeOptions: ObjectModel = {
  '01': '增值税专用发票',
  '08': '增值税专用发票（电子）',
  '03': '机动车销售统一发票',
  '04': '增值税普通发票',
  '10': '增值税普通发票（电子）',
  '11': '增值税普通发票（卷票）',
  '14': '道路通行费电子普通发票',
  '15': '二手车销售统一发票',
  '81': '全电专票',
  '82': '全电普票'
};

/** 日期改变 */
const dateRangeChange = (_date: any, dateString: string[]) => {
  if (dateString.length > 0) {
    queryParams.kprqq = dateString[0];
    queryParams.kprqz = dateString[1];
  } else {
    queryParams.kprqq = '';
    queryParams.kprqz = '';
  }
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
  queryParams.page = 1;
  getList();
}

/** 表格加载 */
var display = computed(() => {
  return tableLoading.value ? "block" : 'none'
})


/** 业务逻辑处理 */
const instance = getCurrentInstance();
const addRequest = reactive<any>({
  open: false,
  title: '新增采集',
  width: 400,
  labelCol: { style: { width: '80px' } },
  form: {
    nsrsbh: '',
    yearMonth: ''
  },
  rules: {
    yearMonth: [
      { required: true, message: '发票日期不能为空' }
    ]
  }
})
// let addRequestForm = toRef(addRequest, "form");
const handleAddNewRequest = () => {
  addRequest.open = true;
}
const addRequestForm = ref();
const submitAddNewRequest = () => {
  addRequestForm.value.validate().then(async () => {
    instance?.proxy?.$Loading.show();
    let res: ResponseData = await doRequest(addRequest.form);
    instance?.proxy?.$Loading.hide();
    if (res.errcode == 0) {
      closeModel();
      getList();
    }
  }).catch(() => { });
}
const closeModel = () => {
  addRequest.open = false;
  addRequest.form = {
    nsrsbh: '',
    yearMonth: ''
  }
}


/** 拉取 */
const doFetch = async (row: ObjectModel) => {
  instance?.proxy?.$Loading.show();
  let res: ResponseData = await fetch(row.id);
  instance?.proxy?.$Loading.hide();
  if (res.errcode == 0) {
    message.success("获取成功" + res.errmsg)
  } else {
    message.error(res.errmsg);
  }
}

/** 重新申请 */
const doRerequest = async (row: ObjectModel) => {
  instance?.proxy?.$Loading.show();
  let res: ResponseData = await rerequest(row.id)
  instance?.proxy?.$Loading.hide();
  if (res.errcode == 0) {
    message.success("获取成功" + res.errmsg)
  } else {
    message.error(res.errmsg);
  }
}
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