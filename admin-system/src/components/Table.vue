<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  list: Object,
  currentPage: Number,
  total: Number,
})

const handleSizeChange = () => {}
const handleCurrentChange = () => {}
</script>
<template>
  <div>
    <el-table
      :data="list"
      border
      stripe
      highlight-current-row
      empty-text="暂无数据~"
      class="margin-top-20"
    >
      <el-table-column prop="username" label="姓名" width="120" />
      <el-table-column prop="created_at" label="创建时间" width="120">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间" width="120">
        <template #default="{ row }">
          {{ formatDate(row.updated_at) }}
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template #default>
          <el-button type="info" round>详情</el-button>
          <el-button type="success" round>修改</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50]"
        background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        class="margin-top-20"
      >
      </el-pagination>
    </div>
  </div>
</template>
<style scoped>
</style>