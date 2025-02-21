<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {
  addEmploymentService,
  deleteEmploymentByEmploymentIdService,
  searchEmploymentByCompanyIdService,
  updateEmploymentService
} from "@/api/employment.js";
import useEmployerInfoStore from "@/stores/employerInfo.js";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";

//展示留言
const InfoStore = useEmployerInfoStore()
console.log('employerInfoStore.info：',InfoStore.info)
const userInfo = ref({
  ...InfoStore.info
})
const model = ref([])

const getInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchEmploymentByCompanyIdService(userInfo.value.companyId);
    // 打印结果
    console.log('Result info:', result);
    model.value = result.data;
    console.log('Message info:', model);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

getInfo()

//删除留言
const deleteInfo = (event, row)=>{

  event.stopPropagation();
  ElMessageBox.confirm(
      '你确认删除该用人单位信息吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //用户点击了确认
        let result = await deleteEmploymentByEmploymentIdService(row.employmentId)
        ElMessage.success(result.message?result.message:'删除成功')
        getInfo()
      })
      .catch(() => {
        //用户点击了取消
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })

}

//修改留言
const updateVisibleDrawer = ref(false)
const updateModel = ref({
  employmentId: '',
  companyId: userInfo.value.companyId,
  studentId: '',
  startDate: '',
  salaryInfo: '',
  terminated: ''

})

const updateInfo = async (row)=>{
  let result = await updateEmploymentService(updateModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getInfo()
}

const showUpdate = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateModel.value.employmentId = row.employmentId;
  updateModel.value.companyId = row.companyId;
  updateModel.value.studentId = row.studentId;
  updateModel.value.startDate = row.startDate;
  updateModel.value.salaryInfo = row.salaryInfo;
  updateModel.value.terminated = row.terminated;

}

//增加留言

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const addModel = ref({
  companyId: userInfo.value.companyId,
  studentId: '',
  startDate: '',
  salaryInfo: '',
  terminated: '',
})

const addInfo = async ()=>{
  let result = await addEmploymentService(addModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getInfo()
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有用工管理</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加用工</el-button>
        </div>
      </div>
    </template>
    <el-table :data="model" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="用工ID" prop="employmentId" > </el-table-column>
      <el-table-column label="用人单位ID" prop="companyId" > </el-table-column>
      <el-table-column label="学号" prop="studentId" > </el-table-column>
      <el-table-column label="用工开始时间" prop="startDate" > </el-table-column>
      <el-table-column label="薪酬信息" prop="salaryInfo" > </el-table-column>
      <el-table-column label="是否结束标记" prop="terminated" > </el-table-column>
      <el-table-column label="操作" >
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showUpdate($event, row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteInfo($event, row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateModel" label-width="100px" >
      <el-form-item label="用工ID" >
        <el-input v-model="updateModel.employmentId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="用人单位ID" >
        <el-input v-model="updateModel.companyId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="学号" >
        <el-input v-model="updateModel.studentId" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="用工开始时间" >
        <el-input v-model="updateModel.startDate" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="薪酬信息" >
        <el-input v-model="updateModel.salaryInfo" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="是否结束标记" >
        <el-radio-group v-model="updateModel.terminated">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="visibleDrawer" title="添加评分" direction="rtl" size="50%">
    <!-- 添加文章表单 -->
    <el-form :model="addModel" label-width="100px" >
      <el-form-item label="学号" >
        <el-input v-model="addModel.studentId" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="用工开始时间" >
        <el-input v-model="addModel.startDate" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="薪酬信息" >
        <el-input type="textarea" v-model="addModel.salaryInfo" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="薪酬信息" >
        <el-radio-group v-model="addModel.terminated">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addInfo">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

</template>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>