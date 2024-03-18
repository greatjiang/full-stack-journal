<script setup>
import axios from 'axios'
import { onMounted } from 'vue'

// onMounted(async()=> {
//   const {data} = await axios.get('/api/employees/list')
//     if(data.errno === 0){
//       console.log(data.data)
//     }
//   })
</script>

<template>
  <div class="common-layout">
    <el-container> 用户管理 </el-container>
  </div>
</template>


<style scoped>
</style>
