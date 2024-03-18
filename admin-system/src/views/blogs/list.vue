<script setup>
import { onMounted, ref, reactive, h, getCurrentInstance } from 'vue'
import { ElNotification } from 'element-plus'
import Edit from './edit.vue'
import moment from 'moment-timezone'

import { useRouter } from 'vue-router'

const router = useRouter()

const { proxy } = getCurrentInstance()
const list = ref([])

let dialogFormVisible = ref(false)

// 表单ref
const ruleFormRef = ref()
// 表单ref
const editRef = ref()

// form
const ruleForm = reactive({
  title: '',
  summary: '',
  label: [],
  level: 0,
  category: '',
})

// 表单验证
const rules = reactive({
  title: [
    {
      required: true,
      message: '请填标题',
      trigger: 'blur',
    },
  ],
  summary: [
    {
      required: true,
      message: '请填写摘要',
      trigger: 'blur',
    },
  ],
})

const resetForm = formEl => {
  // console.log(formEl)
  if (!formEl) return

  dialogFormVisible.value = false
  editFlag.value = false

  formEl.resetFields()

  ruleForm.title = ''
  ruleForm.summary = ''
  ruleForm.label = []
  ruleForm.level = 0
  ruleForm.category = ''
}
// 新增
const submitForm = formEl => {
  if (!formEl) return

  formEl.validate(async (valid, fields) => {
    if (valid) {
      const _data = {}
      _data.title = encodeURIComponent(ruleForm.title)
      _data.summary = encodeURIComponent(ruleForm.summary)
      _data.label = []

      const labels = Object.values(ruleForm.label)
      labels.forEach(item => {
        _data.label.push({
          id: item,
          value: item,
        })
      })

      _data.label = JSON.stringify(_data.label)
      _data.level = ruleForm.level
      _data.category = ruleForm.category
      // console.log(JSON.stringify(ruleForm.level))
      // return
      const { data, code } = await proxy.$fetch('/api/blogs/createBlog', {
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
        ruleForm.title = ''
        ruleForm.summary = ''
        ruleForm.label = []
        ruleForm.level = 0
        ruleForm.category = ''

        getList()
      }
    }
  })
}
//
const curEditId = ref(0)
// 修改
const editForm = formEl => {
  if (!formEl) return

  formEl.validate(async (valid, fields) => {
    if (valid) {
      const _data = {}

      _data.title = encodeURIComponent(ruleForm.title)
      _data.summary = encodeURIComponent(ruleForm.summary)
      _data.label = []

      // console.log(JSON.stringify(ruleForm.label))
      const labels = Object.values(ruleForm.label)

      labels.forEach(item => {
        _data.label.push({
          id: item,
          value: item,
        })
      })

      _data.label = JSON.stringify(_data.label)
      _data.id = curEditId.value
      _data.level = ruleForm.level
      _data.category = ruleForm.category

      // return
      const { data, code } = await proxy.$fetch('/api/blogs/editBlog', {
        method: 'POST',
        data: _data,
      })

      if (code === 1) {
        ElNotification({
          title: '修改成功',
          message: h('i', { style: 'color: teal' }, '数据修改成功'),
          type: 'success',
        })

        editFlag.value = false
        ruleForm.title = ''
        ruleForm.summary = ''
        ruleForm.label = []
        ruleForm.level = 0
        ruleForm.category = ''

        getList()
      }
    }
  })
}

onMounted(() => {
  getList()
  getLabels()
  getCategories()
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
    params.title = encodeURIComponent(searchValue.value)
  }

  params.currentPage = currentPage.value
  params.pageSize = pageSize.value
  params.category = searchCategory.value

  const { data, code } = await proxy.$fetch('/api/blogs/list', {
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

const editArticleAction = id => {
  // console.log(id)
  editBlogFlag.value = true
  curEditBlogId.value = id
  // router.push(`/blogs/edit/${id}`)
}

// 上线 下线
const changeStatusAction = async (status, id, content) => {
  // console.log(status)
  const { data, code } = await proxy.$fetch('/api/blogs/editStatus', {
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
//删除文章
const deleteArticle = async id => {
  const { data, code } = await proxy.$fetch('/api/blogs/deleteArticle', {
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
// label选项数据
const options = ref([])
async function getLabels() {
  const { data, code } = await proxy.$fetch('/api/labels/list')

  if (code === 1) {
    data.list.forEach(item => {
      options.value.push({
        id: item.id,
        value: item.id,
        label: item.name,
      })
    })
  }
}
// category选项数据
const categoryOptions = ref([])
async function getCategories() {
  const { data, code } = await proxy.$fetch('/api/categories/categorylist')

  if (code === 1) {
    data.list.forEach(item => {
      categoryOptions.value.push({
        id: item.id,
        value: item.id,
        label: item.name,
      })
    })
    // console.log(categoryOptions.value)
  }
}

const labelName = arr => {
  const _arr = eval(arr)

  if (!arr) {
    return ['未打标签']
  } else {
    let _labels = []
    options.value.forEach(item => {
      _arr.forEach(itemChild => {
        if (item.id === itemChild.value) {
          _labels.push(item.label)
        }
      })
    })
    if (_labels.length === 0) {
      return ['未打标签']
    } else {
      return _labels
    }
  }
}

const categoryName = id => {
  if (id) {
    let _name = ''
    categoryOptions.value.forEach(item => {
      if (item.id === id) {
        _name = item.label
      }
    })
    return _name
  } else {
    return '未设置'
  }
}

const editFlag = ref(false)

const editAction = item => {
  // console.log(item.category_id)
  if (item.label_id) {
    ruleForm.label = []
    const editLabels = eval(item.label_id)
    editLabels.forEach(item => {
      // console.log(item)
      ruleForm.label.push(item.value)
    })
  }
  ruleForm.title = decodeURIComponent(item.title)
  ruleForm.summary = decodeURIComponent(item.summary)
  curEditId.value = item.id
  ruleForm.level = item.level
  // 做个兼容 目前不知道默认值为0时 为啥select为啥会多出一项
  ruleForm.category = item.category_id ? item.category_id : null

  editFlag.value = true
}
// 编辑博客
const editBlogFlag = ref(false)
const curEditBlogId = ref(0)
// 编辑title close事件
const editTitleCancel = () => {
  //弹窗标签选项置空
  ruleForm.label = []
  ruleForm.title = ''
  ruleForm.summary = ''
  ruleForm.level = 0
  ruleForm.category = ''
}

const searchCategory = ref('')

const searchCategoryChange = () => {
  console.log(searchCategory.value)
  getList(searchCategory.value)
}
</script>

<template>
  <div class="search-area">
    <el-input v-model="searchValue" class="search-input" placeholder="搜索" />

    <el-select
      v-model="searchCategory"
      @change="searchCategoryChange"
      clearable
      placeholder="选择类型"
    >
      <el-option
        v-for="item in categoryOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>

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
    <el-table-column prop="label_id" label="标签">
      <template #default="{ row }">
        <el-tag
          v-for="item in labelName(row.label_id)"
          :key="item"
          class="mx-1"
          effect="light"
        >
          {{ item }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="category_id" label="类型">
      <template #default="{ row }">
        <el-tag class="mx-1" effect="light">
          {{ categoryName(row.category_id) }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="level" label="置顶" />
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
    <el-table-column prop="status" label="文章状态">
      <template #default="{ row }">
        {{ row.status === 1 ? '已上线' : '已下线' }}
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" round @click="editAction(row)"
          >修改</el-button
        >
        <el-button type="primary" round @click="editArticleAction(row.id)"
          >编辑博客</el-button
        >
        <el-button
          type="warning"
          v-if="row.status >= 1"
          round
          @click="changeStatusAction(0, row.id, true)"
          >撤销</el-button
        >
        <el-button
          type="warning"
          v-else
          round
          @click="changeStatusAction(1, row.id, row.content)"
          >发布</el-button
        >
        <!-- <el-button type="danger" round @click="deleteArticle(row.id)"
          >删除</el-button
        > -->
        <el-popconfirm
          v-if="row.status !== 1"
          @confirm="deleteArticle(row.id)"
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

  <el-dialog v-model="dialogFormVisible" title="新建博客">
    <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>

      <el-form-item label="摘要" prop="summary">
        <el-input v-model="ruleForm.summary" />
      </el-form-item>

      <el-form-item label="标签" prop="label">
        <el-select
          v-model="ruleForm.label"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="选择标签"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="类型" prop="category_id">
        <el-select
          v-model="ruleForm.category"
          filterable
          allow-create
          clearable
          default-first-option
          :reserve-keyword="false"
          placeholder="选择类型"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="推荐">
        <el-input v-model="ruleForm.level" />
        <!-- <el-radio-group v-model="ruleForm.level">
          <el-radio :label="9999">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group> -->
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

  <el-dialog v-model="editFlag" title="修改博客" @close="editTitleCancel">
    <el-form ref="editRef" :rules="rules" :model="ruleForm">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>

      <el-form-item label="摘要" prop="summary">
        <el-input v-model="ruleForm.summary" />
      </el-form-item>

      <el-form-item label="标签" prop="label">
        <el-select
          v-model="ruleForm.label"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="选择标签"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="类型" prop="category">
        <el-select
          v-model="ruleForm.category"
          filterable
          allow-create
          clearable
          default-first-option
          :reserve-keyword="false"
          placeholder="选择类型"
        >
          <el-option
            v-for="item in categoryOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="推荐">
        <el-input v-model="ruleForm.level" />
        <!-- <el-radio-group v-model="ruleForm.level">
          <el-radio :label="9999">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group> -->
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm(editRef)">取消</el-button>
        <el-button type="primary" @click="editForm(editRef)"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="editBlogFlag" title="编辑博客">
    <Edit :id="curEditBlogId" v-if="editBlogFlag"></Edit>
  </el-dialog>
</template>

<style scoped>
.search-area {
  display: flex;
  width: 500px;
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
