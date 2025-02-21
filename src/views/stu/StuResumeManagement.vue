<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import useStudentInfoStore from "@/stores/studentInfo.js";
import {
  addStudentResumeService,
  deleteStudentResumeByResumeIdService,
  searchStudentResumeByStudentIdService, updateStudentResumeApplicationService
} from "@/api/studentResume.js";

//展示留言
const InfoStore = useStudentInfoStore()
console.log('adminInfoStore.info：',InfoStore.info)
const userInfo = ref({
  ...InfoStore.info
})
const model = ref([])

const getInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchStudentResumeByStudentIdService(userInfo.value.studentId);
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
      '你确认删除该应聘吗？',
      '温馨提示',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(async () => {
        //用户点击了确认
        let result = await deleteStudentResumeByResumeIdService(row.resumeId)
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
  resumeId: '',
  studentId: userInfo.value.studentId,
  publicationId: '',
  availableTime: '',
  uploadTime: '',
  remarks: '',
  expiredStatus:''
})

const updateInfo = async (row)=>{
  let result = await updateStudentResumeApplicationService(updateModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getInfo()
}

const showUpdate = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateModel.value.resumeId = row.resumeId;
  updateModel.value.studentId = row.studentId;
  updateModel.value.publicationId = row.publicationId;
  updateModel.value.availableTime = row.availableTime;
  updateModel.value.uploadTime = row.uploadTime;
  updateModel.value.remarks = row.remarks;
  updateModel.value.expiredStatus = row.expiredStatus;
}


//增加留言

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const addModel = ref({
  studentId: userInfo.value.studentId,
  publicationId: '',
  availableTime: '',
  remarks: '',
})

const addInfo = async ()=>{
  let result = await addStudentResumeService(addModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getInfo()
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>我的简历信息</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加简历信息</el-button>
        </div>
      </div>
    </template>
    <el-table :data="model" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="简历编号" prop="resumeId" > </el-table-column>
      <el-table-column label="学号" prop="studentId" > </el-table-column>
      <el-table-column label="招聘编号" prop="publicationId" > </el-table-column>
      <el-table-column label="空闲时间" prop="availableTime" > </el-table-column>
      <el-table-column label="上传时间" prop="uploadTime" > </el-table-column>
      <el-table-column label="备注" prop="remarks" > </el-table-column>
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

  <el-drawer v-model="visibleDrawer" title="添加评分" direction="rtl" size="50%">
    <!-- 添加文章表单 -->
    <el-form :model="addModel" label-width="100px" >
      <el-form-item label="招聘编号" >
        <el-input type="textarea" v-model="addModel.publicationId" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="空闲时间" >
        <el-input type="textarea" v-model="addModel.availableTime" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="备注" >
        <el-input type="textarea" v-model="addModel.remarks" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addInfo">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateModel" label-width="100px" >
      <el-form-item label="简历编号" >
        <el-input v-model="updateModel.resumeId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="学号" >
        <el-input v-model="updateModel.studentId" placeholder="请输入标题"  disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="招聘编号" >
        <el-input v-model="updateModel.publicationId" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="空闲时间" >
        <el-input v-model="updateModel.availableTime" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="上传时间" >
        <el-input v-model="updateModel.uploadTime" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="备注" >
        <el-input v-model="updateModel.remarks" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">确认修改</el-button>
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