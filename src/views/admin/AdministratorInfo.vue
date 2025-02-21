<script setup>
import {ref} from 'vue'
import useAdminInfoStore from "@/stores/adminInfo.js";
import {updateAdminInfoService} from "@/api/administrator.js";
import {ElMessage} from "element-plus";

const adminInfoStore = useAdminInfoStore()
console.log('adminInfoStore.info：',adminInfoStore.info)

const userInfo = ref({
   ...adminInfoStore.info
})
const rules = {
  nickname: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    {
      pattern: /^\S{2,10}$/,
      message: '昵称必须是2-10位的非空字符串',
      trigger: 'blur'
    }
  ]
}

//修改个人信息
const updateAdminInfo = async ()=>{
  //调用接口
  console.log("修改个人信息：")
  console.log(userInfo.value)

  let result = await updateAdminInfoService(userInfo.value)
  ElMessage.success(result.msg? result.msg : '修改成功')

  //修改pinia中的个人信息
  adminInfoStore.setInfo(userInfo.value)
}


</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
          <el-form-item label="管理员ID">
            <el-input v-model="userInfo.administratorId" disabled></el-input>
          </el-form-item>
          <el-form-item label="管理员名称">
            <el-input v-model="userInfo.administratorName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateAdminInfo">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>