<script setup>
import {ref} from "vue";
import useStudentInfoStore from "@/stores/studentInfo.js";
import {updateStudentService} from "@/api/student.js";
import {ElMessage} from "element-plus";

const InfoStore = useStudentInfoStore()
console.log('adminInfoStore.info：',InfoStore.info)

const userInfo = ref({
  ...InfoStore.info
})
const rules = {
  studentName: [
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

  let result = await updateStudentService(userInfo.value)
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
          <el-form-item label="学号">
            <el-input v-model="userInfo.studentId" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="userInfo.studentName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userInfo.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="userInfo.nation"></el-input>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="userInfo.nativePlace"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-input v-model="userInfo.birthDate"></el-input>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-input v-model="userInfo.politicalStatus"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateInfo">提交修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped lang="scss">

</style>