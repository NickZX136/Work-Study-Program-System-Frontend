<script setup>
import {ref} from 'vue'
import {updateAdminInfoService} from "@/api/administrator.js";
import {ElMessage} from "element-plus";
import useEmployerInfoStore from "@/stores/employerInfo.js";
import {updateEmployerInfoService} from "@/api/employer.js";

const InfoStore = useEmployerInfoStore()
console.log('adminInfoStore.info：',InfoStore.info)

const userInfo = ref({
  ...InfoStore.info
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
const updateInfo = async ()=>{
  //调用接口
  console.log("修改个人信息：")
  console.log(userInfo.value)

  let result = await updateEmployerInfoService(userInfo.value)
  ElMessage.success(result.msg? result.msg : '修改成功')

  //修改pinia中的个人信息
  InfoStore.setInfo(userInfo.value)
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
          <el-form-item label="企业编号">
            <el-input v-model="userInfo.companyId" disabled></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model="userInfo.companyName"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="userInfo.contactPerson"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="userInfo.address"></el-input>
          </el-form-item>
          <el-form-item label="性质">
            <el-input v-model="userInfo.companyNature"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
          <el-form-item label="规模">
            <el-input v-model="userInfo.scale"></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="userInfo.contactPhone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateInfo">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>