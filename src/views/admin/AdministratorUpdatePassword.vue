<script setup>
import {ref} from "vue";
import {updateAdminPasswordService} from "@/api/administrator.js";

const registerData = ref({
  administratorId:'',
  administratorPassword:'',
  administratorRePassword:''
})

//密码校验函数
const rePasswordValid = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次确认密码'))
  } else if (value !== registerData.value.administratorPassword) {
    callback(new Error("请确保两次输入的密码一致"))
  } else {
    callback()
  }
}

//定义表单校验规则
const rules={
  administratorPassword:[
    {required: true, message: '请输入密码!', trigger: 'blur'},
    {min: 5, max: 16, message: '请输入长度为5-16位非空字符!', trigger: 'blur'}
  ],
  administratorRePassword:[
    {required: true, validator: rePasswordValid, trigger: 'blur' }
  ]
}

//修改个人信息
//调用后台接口，实现注册
const updatePassword = async()=>{

  let result = await updateAdminPasswordService(registerData.value);
  console.log(result);

  alert(result.msg ? result.msg : '注册成功')
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>重置密码</span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form :model="registerData" :rules="rules" label-width="100px" size="large">
          <el-form-item prop="administratorPassword" label="新密码">
            <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.administratorPassword"></el-input>
          </el-form-item>
          <el-form-item prop="administratorRePassword" label="确认新密码">
            <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.administratorRePassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePassword">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">

</style>