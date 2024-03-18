<script setup>
// import axios from 'axios'
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
  username: '',
  email: '',
  phone: '',
  role: '',
  status: '',
})

// 表单验证
const rules = reactive({
  username: [
    {
      required: true,
      message: '请填写姓名',
      trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: '请填写邮箱',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: '请填写手机',
      trigger: 'blur',
    },
  ],
  role: [
    {
      required: true,
      message: '请填写角色',
      trigger: 'blur',
    },
  ],
  status: [
    {
      required: true,
      message: '请填写状态',
      trigger: 'blur',
    },
  ],
})

const resetForm = formEl => {
  if (!formEl) return
  dialogFormVisible.value = false
  formEl.resetFields()
}

const submitForm = async formEl => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      axios
        .post('/api/users/create', ruleForm)
        .then(res => {
          // console.log(res.data.errno)
          if (res.data.code === 1) {
            dialogFormVisible.value = false
            formEl.resetFields()

            ElNotification({
              title: '添加成功',
              message: h('i', { style: 'color: teal' }, '数据添加成功'),
              type: 'success',
            })

            getList()
          }
        })
        .catch(error => {
          console.log(error)
        })
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
const pageSize = ref(10)

async function getList() {
  let params = {}
  if (searchValue.value !== '') {
    params.name = searchValue.value
  }

  params.currentPage = currentPage.value
  params.pageSize = pageSize.value

  const { data, code } = await proxy.$fetch('/api/users/list', {
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

  <el-dialog v-model="dialogFormVisible" title="新建">
    <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>

      <el-form-item label="手机" prop="phone">
        <el-input v-model="ruleForm.phone" />
      </el-form-item>

      <el-form-item label="角色" prop="role">
        <el-input v-model="ruleForm.role" />
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-input v-model="ruleForm.status" />
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
</style>
