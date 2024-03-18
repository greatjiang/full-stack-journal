<script setup>
import { onMounted, ref, reactive, h, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import moment from 'moment'

import { useRouter } from 'vue-router'

const router = useRouter()

const { proxy } = getCurrentInstance()
const list = ref([])

let dialogFormVisible = ref(false)

// 表单ref
const ruleFormRef = ref()

// form
const ruleForm = reactive({
  title: '',
  summary: '',
  // label: '',
  // cover: '',
  // category: '',
})

onMounted(() => {
  getDeleteList()
})

// 搜索
const searchValue = ref('')

//total
const total = ref(0)

//分页
const currentPage = ref(1)
const pageSize = ref(10)

async function getDeleteList() {
  let params = {}
  if (searchValue.value !== '') {
    params.title = encodeURIComponent(searchValue.value)
  }

  params.currentPage = currentPage.value
  params.pageSize = pageSize.value

  const { data, code } = await proxy.$fetch('/api/blogs/getDeleteList', {
    params,
  })

  if (code === 1) {
    list.value = data.list
    total.value = data.total
  }
}

const handleSizeChange = _pageSize => {
  pageSize.value = _pageSize

  getDeleteList()
}

const handleCurrentChange = _currentPage => {
  currentPage.value = _currentPage

  getDeleteList()
}

const formatDate = dateString => {
  return moment(dateString).format('YYYY-MM-DD hh:mm:ss')
}

const recover = async id => {
  const { data, code } = await proxy.$fetch('/api/blogs/recoverArticle', {
    method: 'POST',
    data: {
      id,
    },
  })

  if (code === 1) {
    getDeleteList()
    ElNotification({
      title: '操作成功',
      message: h('i', { style: 'color: teal' }, '操作成功'),
      type: 'success',
    })
  } else {
    ElNotification({
      title: '操作失败',
      message: h('i', { style: 'color: teal' }, '操作失败'),
      type: 'error',
    })
  }
}
</script>

<template>
  <div class="search-area">
    <el-input v-model="searchValue" class="search-input" placeholder="搜索" />

    <el-button type="primary" @click="getDeleteList">搜索</el-button>
  </div>

  <el-table
    :data="list"
    border
    stripe
    highlight-current-row
    empty-text="暂无数据~"
    class="margin-top-20"
    max-height="70vh"
  >
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="title" label="标题">
      <template #default="{ row }">
        {{ decodeURIComponent(row.title) }}
      </template>
    </el-table-column>
    <el-table-column prop="summary" label="摘要">
      <template #default="{ row }">
        {{ decodeURIComponent(row.summary) }}
      </template>
    </el-table-column>
    <!-- <el-table-column prop="label_id" label="标签" />
    <el-table-column prop="cover" label="封面" /> -->
    <el-table-column prop="likenum" label="点赞" />
    <el-table-column prop="status" label="文章状态">
      <template #default="{ row }">
        {{ row.status === 1 ? '已上线' : '已下线' }}
      </template>
    </el-table-column>
    <el-table-column prop="visitinum" label="访问量" />
    <!-- <el-table-column prop="category_id" label="分类" /> -->
    <el-table-column prop="created_at" label="创建时间">
      <template #default="{ row }">
        {{ formatDate(row.created_at) }}
      </template>
    </el-table-column>
    <el-table-column prop="updated_at" label="更新时间">
      <template #default="{ row }">
        {{ formatDate(row.updated_at) }}
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" round @click="recover(row.id)"
          >恢复</el-button
        >
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
</template>

<style scoped>
.search-area {
  display: flex;
  width: 400px;
  justify-content: center;
}

.inline-block {
  display: inline-block;
}

.margin-top-20 {
  margin-top: 20px;
}

.search-input {
  height: 32px;
  line-height: 32px;
  margin-right: 10px;
}
</style>
