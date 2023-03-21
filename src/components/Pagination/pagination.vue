<template>
  <div class="pagination-container" v-show="total">
    <Pagination :current="page" :total="total" :pageSize="pageSize" :pageSizeOptions="pageSizeOptions"
      :show-total="total => `${total}条`" show-quick-jumper @change="paginationChange" @showSizeChange="showSizeChange">
      <template #buildOptionText="props">
        <span>{{ props.value }} 条/页</span>
      </template>
    </Pagination>
  </div>
</template>

<script setup lang="ts" name="myPagination">
import { Pagination } from 'ant-design-vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
  page: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 100
  },
  total: {
    type: Number,
    default: 0
  },
  pageSizeOptions: {
    type: Array as any,
    default: ['50', '100', '500', '1000']
  }
})

const emit = defineEmits(['update:page', 'update:pageSize', "pagination"])
/** 页码改变 */
const paginationChange = (pageNum: number) => {
  /** 父组件需要使用v-model, .2中需要使用.sync */
  emit("update:page", pageNum)
  emit('pagination');
}
/** 页面数量改变 */
const showSizeChange = (current: any, size: any) => {
  emit("update:pageSize", size);
}

</script>

<style scoped>
.pagination-container {
  text-align: right;
  padding: 10px 20px;
}
</style>