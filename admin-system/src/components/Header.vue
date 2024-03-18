<script setup>
import { ref } from 'vue'
import { logout, nickname } from '../auth/auth'
import { useRouter } from 'vue-router'

const handleSelect = (key, keyPath) => {}

const router = useRouter()

const _nickname = ref('')

_nickname.value = nickname()

const userLogout = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <el-header class="el-header">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#252a34"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
      menu-trigger="click"
      :ellipsis="false"
    >
      <div class="logo">GreatJiang-System</div>

      <div class="flex-grow" />

      <el-sub-menu index="1">
        <template #title>你好，{{ _nickname }}</template>
        <el-menu-item index="1-1" @click="userLogout">退出</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-header>
</template>

<style scoped>
.el-header {
  padding: 0;
  margin: 0;
}

.flex-grow {
  flex-grow: 1;
  border: none;
}

.logo {
  width: 260px;
  height: 60px;
  line-height: 60px;
  font-size: 22px;
  color: #fff;
  text-align: center;
  text-shadow: 4px 4px #ff5722;
  background: #0d7377;
}
</style>
