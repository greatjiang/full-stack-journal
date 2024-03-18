<script setup>
import { onMounted, ref, reactive, h, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import moment from 'moment-timezone'

const { proxy } = getCurrentInstance()
const list = ref([])

let dialogFormVisible = ref(false)
// 表单ref
const ruleFormRef = ref()
// form
const ruleForm = reactive({
  name: '',
  cover: '',
  level: '',
})
// 表单验证
const rules = reactive({
  name: [
    {
      required: true,
      message: '请填写专题名',
      trigger: 'blur',
    },
  ],
  cover: [
    {
      required: true,
      message: '请上传专题封面',
      trigger: 'blur',
    },
  ],
})

const resetForm = formEl => {
  if (!formEl) return
  dialogFormVisible.value = false
  editFlag.value = false
  formEl.resetFields()
}

const submitForm = formEl => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const _data = {}
      _data.name = ruleForm.name
      _data.cover = ruleForm.cover

      console.log(JSON.stringify(_data))
      // return
      const { data, code } = await proxy.$fetch(
        '/api/categories/createCategory',
        {
          method: 'POST',
          data: _data,
        }
      )

      if (code === 1) {
        ElNotification({
          title: '添加成功',
          message: h('i', { style: 'color: teal' }, '数据添加成功'),
          type: 'success',
        })

        dialogFormVisible.value = false

        ruleForm.name = ''
        ruleForm.cover = ''

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

const editAciton = formEl => {
  if (!formEl) return
  formEl.validate(async (valid, fields) => {
    if (valid) {
      const _data = {}
      _data.name = ruleForm.name
      _data.cover = ruleForm.cover
      _data.level = ruleForm.level
      console.log(JSON.stringify(_data))
      _data.id = curId.value
      // return
      const { data, code } = await proxy.$fetch(
        '/api/categories/updateCategory',
        {
          method: 'POST',
          data: _data,
        }
      )

      if (code === 1) {
        ElNotification({
          title: '修改成功',
          message: h('i', { style: 'color: teal' }, '数据修改成功'),
          type: 'success',
        })

        editFlag.value = false

        ruleForm.name = ''
        ruleForm.cover = ''
        ruleForm.level = 0

        getList()
      } else {
        ElNotification({
          title: '修改失败',
          message: h('i', { style: 'color: teal' }, '数据修改失败'),
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

  const { data, code } = await proxy.$fetch('/api/categories/categorylist', {
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
  const utcMoment = moment.utc(dateString)

  // 将 Moment 对象转换为中国标准时间的 Moment 对象
  const chinaMoment = utcMoment.tz('Asia/Shanghai')

  // 将中国标准时间的 Moment 对象转换为字符串
  const chinaTimeString = chinaMoment.format('YYYY-MM-DD HH:mm:ss')
  // console.log(chinaTimeString) // 输出：2022-05-17 16:30:00
  return chinaTimeString
}

const deleteLabels = async id => {
  const { data, code } = await proxy.$fetch('/api/categories/deleteCategory', {
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

const handleFileChange = async event => {
  const file = event.target.files[0]
  const formData = new FormData()
  formData.append('file', file)

  // return
  const { data, code } = await proxy.$fetch('/api/upload/upload', {
    method: 'POST',
    data: formData,
  })

  if (code === 1) {
    console.log(data)
    ruleForm.cover = data
  }
}

// 上线 下线
const changeStatusAction = async (status, id) => {
  // console.log(status)
  const { code } = await proxy.$fetch('/api/categories/editStatus', {
    method: 'POST',
    data: {
      status,
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

const curId = ref()
const editFlag = ref(false)
const editAction = item => {
  ruleForm.name = item.name
  ruleForm.level = item.level
  ruleForm.cover = item.cover
  curId.value = item.id
  editFlag.value = true
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
    <el-table-column prop="name" label="名称">
      <template #default="{ row }">
        {{ decodeURIComponent(row.name) }}
      </template>
    </el-table-column>
    <el-table-column prop="cover" label="封面">
      <template #default="{ row }">
        <el-image
          style="width: 100px"
          :src="row.cover"
          :zoom-rate="1.2"
          :initial-index="0"
          fit="cover"
          :z-index="100"
        />
      </template>
    </el-table-column>

    <el-table-column prop="level" label="级别">
      <template #default="{ row }">
        {{ row.level }}
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
        <el-button type="primary" round @click="editAction(row)"
          >修改</el-button
        >

        <el-button
          type="warning"
          v-if="row.status >= 1"
          round
          @click="changeStatusAction(0, row.id)"
          >撤销</el-button
        >
        <el-button
          type="warning"
          v-else
          round
          @click="changeStatusAction(1, row.id)"
          >发布</el-button
        >
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

  <el-dialog v-model="dialogFormVisible" title="新建专题">
    <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <input type="file" name="cover" @change="handleFileChange" />
        <img class="cover-img" :src="ruleForm.cover" alt="" />
      </el-form-item>
    </el-form>

    <el-form-item label="级别" prop="level">
      <el-input class="w-50 m-2" v-model="ruleForm.level" />
    </el-form-item>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="editFlag" title="修改专题">
    <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item label="封面" prop="cover">
        <input type="file" name="cover" @change="handleFileChange" />
        <img class="cover-img" :src="ruleForm.cover" alt="" />
      </el-form-item>
    </el-form>

    <el-form-item label="级别" prop="level">
      <el-input class="w-50 m-2" v-model="ruleForm.level" />
    </el-form-item>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
        <el-button type="primary" @click="editAciton(ruleFormRef)">
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

.cover-img {
  width: 50px;
  height: 100%;
}
</style>
