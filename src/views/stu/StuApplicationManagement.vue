<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import {
  addStudentApplicationService,
  deleteStudentApplicationByApplicationIdService,
  searchStudentApplicationByCompanyIdService,
  searchStudentApplicationByStudentIdService,
  updateStudentApplicationService
} from "@/api/studentApplication.js";
import useEmployerInfoStore from "@/stores/employerInfo.js";
import {ElMessage, ElMessageBox} from "element-plus";
import useStudentInfoStore from "@/stores/studentInfo.js";

//展示留言
const InfoStore = useStudentInfoStore()
console.log('StudentApplicationInfoStore.info：',InfoStore.info)
const userInfo = ref({
  ...InfoStore.info
})
const model = ref([])

const getInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchStudentApplicationByStudentIdService(userInfo.value.studentId);
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
        let result = await deleteStudentApplicationByApplicationIdService(row.applicationId)
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
  applicationId: '',
  studentId: '',
  postingId: '',
  applicationTime: '',
  feedbackResult: '',
  feedbackTime: '',
  expiredStatus: ''
})

const updateInfo = async (row)=>{
  //TODO:这里修改不能判断是否输入的是该用人单位拥有的postingId
  let result = await updateStudentApplicationService(updateModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getInfo()
}

const showUpdate = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateModel.value.applicationId = row.applicationId;
  updateModel.value.studentId = row.studentId;
  updateModel.value.postingId = row.postingId;
  updateModel.value.applicationTime = row.applicationTime;
  updateModel.value.feedbackResult = row.feedbackResult;
  updateModel.value.feedbackTime = row.feedbackTime;
  updateModel.value.expiredStatus = row.expiredStatus;
}

//增加留言

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const addModel = ref({
  studentId: userInfo.value.studentId,
  postingId: '',
  applicationTime: '',
  feedbackResult: '',
  feedbackTime: '',
  expiredStatus: ''
})

const addInfo = async ()=>{
  let result = await addStudentApplicationService(addModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getInfo()
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有应聘信息管理</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加应聘信息</el-button>
        </div>
      </div>
    </template>
    <el-table :data="model" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="应聘编号" prop="applicationId" > </el-table-column>
      <el-table-column label="学号" prop="studentId" > </el-table-column>
      <el-table-column label="招聘编号" prop="postingId" > </el-table-column>
      <el-table-column label="应聘时间" prop="applicationTime" > </el-table-column>
      <el-table-column label="反馈结果" prop="feedbackResult" > </el-table-column>
      <el-table-column label="反馈时间" prop="feedbackTime" > </el-table-column>
      <el-table-column label="过期状态" prop="expiredStatus" > </el-table-column>
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
      <el-form-item label="应聘编号" >
        <el-input v-model="updateModel.applicationId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="学号" >
        <el-input v-model="updateModel.studentId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="招聘编号" >
        <el-input v-model="updateModel.postingId" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="应聘时间" >
        <el-input v-model="updateModel.applicationTime" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="visibleDrawer" title="添加应聘信息" direction="rtl" size="50%">
    <!-- 添加文章表单 -->
    <el-form :model="addModel" label-width="100px" >
      <el-form-item label="招聘编号" >
        <el-input v-model="addModel.postingId" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="应聘时间" >
        <el-input v-model="addModel.applicationTime" placeholder="请输入内容"></el-input>
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