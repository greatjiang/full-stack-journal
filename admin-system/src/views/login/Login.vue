<script setup>
import axios from 'axios'
import { ref, h, reactive } from 'vue'
import CryptoJS from 'crypto-js'
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const passwordType = ref(true)

const ruleForm = reactive({
  username: '',
  password: '',
})

// 按钮文案 0注册 1登录
const buttonType = ref(1)

// 注册账号
const toggleAction = () => {
  ruleForm.username = ''
  ruleForm.password = ''

  buttonType.value = Math.abs(buttonType.value - 1)
}

const submitAction = async () => {
  const hash = CryptoJS.SHA256(ruleForm.password)
  const _password = hash.toString(CryptoJS.enc.Hex)

  let _api = buttonType.value ? '/api/login/login' : '/api/register/register'

  const { data } = await axios.post(_api, {
    username: ruleForm.username,
    password: _password,
  })

  if (data.code === 1) {
    if (buttonType.value === 0) {
      buttonType.value = 1
      ruleForm.username = ''
      ruleForm.password = ''

      ElNotification({
        title: '',
        message: h('i', { style: 'color: teal' }, '请登录~'),
        type: 'success',
      })
    }

    if (buttonType.value === 1) {
      router.push('/blogs')
    }
  } else {
    ElNotification({
      title: '',
      message: h('i', { style: 'color: teal' }, data.message),
      type: 'error',
    })
  }
}

// 表单验证
const rules = reactive({
  username: [
    {
      required: true,
      message: '请填写姓名',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '请填写密码',
      trigger: 'blur',
    },
  ],
})
</script>

<template>
  <div class="login-wrapper">
    <div class="login-container">
      <el-form class="form" ref="ruleFormRef" :rules="rules" :model="ruleForm">
        <el-form-item prop="username">
          <input
            class="form-input"
            type="text"
            v-model="ruleForm.username"
            placeholder="输入用户名"
          />
        </el-form-item>

        <el-form-item prop="password">
          <input
            class="form-input"
            :type="passwordType ? 'password' : 'text'"
            v-model="ruleForm.password"
            placeholder="输入密码"
          />
        </el-form-item>

        <el-icon
          @click="passwordType = false"
          v-if="passwordType"
          class="passowrd-hide"
          ><Hide
        /></el-icon>

        <el-icon @click="passwordType = true" v-else class="passowrd-hide"
          ><View
        /></el-icon>

        <button
          class="form-button"
          :class="{ registry: !buttonType }"
          type="button"
          @click="submitAction()"
        >
          {{ buttonType ? '登录' : '注册' }}
        </button>

        <div class="tips">
          <!-- <span>忘记密码</span>
          <span>|</span>
          <span @click="toggleAction">{{
            buttonType ? '注册新账号' : '去登录'
          }}</span> -->
        </div>
      </el-form>
    </div>
  </div>
</template>


<style scoped lang="less">
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
  background-color: #a8d8ea;
  background-size: cover;
  flex-wrap: wrap;
}

.login-container {
  width: 500px;
  height: 300px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-content: center;
}

.form {
  width: 300px;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  position: relative;
}

.form-input {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
  outline: none;
  padding: 0 10px;
  box-sizing: border-box;
}

.form-button {
  width: 300px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  color: #fff;
  background: #3370ff;

  &.registry {
    background: #54d75f;
  }
}

.form-input::placeholder {
  color: #ddd;
}

.tips {
  width: 300px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  font-size: 18px;
  display: flex;
  justify-content: center;
  color: #585e6d;
  font-size: 14px;

  span {
    display: inline-block;
    margin: 0 10px;
  }
}

.passowrd-hide {
  position: absolute;
  top: 126px;
  right: 20px;
}
</style>
