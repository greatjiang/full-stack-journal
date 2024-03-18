<script setup>
import { onMounted, ref, reactive, h, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import moment from 'moment'

const { proxy } = getCurrentInstance()
const list = ref([])

let dialogFormVisible = ref(false)

// 表单ref
const ruleFormRef = ref()
// form
const ruleForm = reactive({
  name: '',
})
// 表单验证
const rules = reactive({
  name: [
    {
      required: true,
      message: '请填标签名',
      trigger: 'blur',
    },
  ],
})

const resetForm = formEl => {
  if (!formEl) return
  dialogFormVisible.value = false
  formEl.resetFields()
}

const submitForm = formEl => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const _data = {}
      _data.name = ruleForm.name

      const { data, code } = await proxy.$fetch('/api/labels/createLabels', {
        method: 'POST',
        data: _data,
      })

      if (code === 1) {
        ElNotification({
          title: '添加成功',
          message: h('i', { style: 'color: teal' }, '数据添加成功'),
          type: 'success',
        })

        dialogFormVisible.value = false

        ruleForm.name = ''

        getList()
      } else {
        ElNotification({
          title: '添加失败',
          message: h('i', { style: 'color: teal' }, '数据添加失败'),
          type: 'error',
        })
      }
    }
  })
}

onMounted(() => {
  getList()
})

// 搜索
const searchValue = ref('')

//total
const total = ref(0)

//分页
const currentPage = ref(1)
const pageSize = ref(20)

async function getList() {
  let params = {}
  if (searchValue.value !== '') {
    params.name = searchValue.value
  }

  params.currentPage = currentPage.value
  params.pageSize = pageSize.value

  const { data, code } = await proxy.$fetch('/api/labels/list', {
    params,
  })

  if (code === 1) {
    list.value = data.list
    total.value = data.total
  }
}

const handleSizeChange = _pageSize => {
  pageSize.value = _pageSize

  getList()
}

const handleCurrentChange = _currentPage => {
  currentPage.value = _currentPage

  getList()
}

const formatDate = dateString => {
  return moment(dateString).format('YYYY-MM-DD hh:mm:ss')
}

const deleteLabels = async id => {
  const { data, code } = await proxy.$fetch('/api/labels/deleteLabels', {
    method: 'POST',
    data: {
      id,
    },
  })

  if (code === 1) {
    getList()
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

    <el-button type="primary" @click="getList">搜索</el-button>
    <el-button type="success" @click="dialogFormVisible = true">新建</el-button>
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
    <el-table-column prop="name" label="标题">
      <template #default="{ row }">
        {{ decodeURIComponent(row.name) }}
      </template>
    </el-table-column>
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
        <el-popconfirm
          v-if="row.status !== 1"
          @confirm="deleteLabels(row.id)"
          title="确定删除吗？"
        >
          <template #reference>
            <el-button type="danger" round>删除</el-button>
          </template>
        </el-popconfirm>
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

  <el-dialog v-model="dialogFormVisible" title="新建标签">
    <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
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

.el-button + .el-button {
  margin-left: 0;
}
</style>
