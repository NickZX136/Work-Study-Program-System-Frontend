<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import useJobPostingInfoStore from "@/stores/jobPostingInfo.js";
import {
  addJobPostingService,
  deleteJobPostingByPostingIdService,
  searchAllJobPostingService, searchByCompanyIdJobPostingService,
  updateJobPostingService
} from "@/api/jobPosting.js";
import {ElMessage, ElMessageBox} from "element-plus";
import useEmployerInfoStore from "@/stores/employerInfo.js";

const InfoStore = useEmployerInfoStore()
console.log('InfoStore.info：',InfoStore.info)

const userInfo = ref({
  ...InfoStore.info
})
const companyId = userInfo.value.companyId
console.log("userInfo.value.companyId",userInfo.value.companyId)

//展示留言
const infoStore = useJobPostingInfoStore();
const model = ref([])

const getInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchByCompanyIdJobPostingService(companyId);
    // 打印结果
    console.log('Result info:', result);
    model.value = result.data;
    console.log('model info:', model);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

getInfo()

//删除留言
const deleteInfo = (event, row)=>{

  event.stopPropagation();

  if(userInfo.value.companyId===row.companyId){
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
          let result = await deleteJobPostingByPostingIdService(row.categoryId)
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
  }else {
    ElMessageBox.alert('您不是这个留言的作者，无法删除', '提示', {
      confirmButtonText: 'OK',
    })
  }

}


//修改留言
const updateVisibleDrawer = ref(false)
const updateModel = ref({
  postingId: '',
  jobTitle: '',
  categoryId: '',
  publicationId: '',
  publicationDate: '',
  clickCount: '',
  companyId: '',
  detailedRequirements: '',
  salaryInfo: '',
  filledStatus: '',
  expiredStatus: ''

})

const updateInfo = async (row)=>{
  let result = await updateJobPostingService(updateModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getInfo()
}

const showUpdate = (event, row) =>{
  event.stopPropagation();
  if(userInfo.value.companyId===row.companyId){
    updateVisibleDrawer.value = true
    updateModel.value.postingId = row.postingId;
    updateModel.value.jobTitle = row.jobTitle;
    updateModel.value.categoryId = row.categoryId;
    updateModel.value.publicationId = row.publicationId;
    updateModel.value.publicationDate = row.publicationDate;
    updateModel.value.clickCount = row.clickCount;
    updateModel.value.companyId = row.companyId;
    updateModel.value.detailedRequirements = row.detailedRequirements;
    updateModel.value.salaryInfo = row.salaryInfo;
    updateModel.value.filledStatus = row.filledStatus;
    updateModel.value.expiredStatus = row.expiredStatus;
  }else {
    ElMessageBox.alert('您不是这个留言的作者，无法修改', '提示', {
      confirmButtonText: 'OK',
    })
  }

}

//增加留言

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const addModel = ref({
  jobTitle: '',
  categoryId: '',
  publicationId: '',
  clickCount: '',
  companyId: companyId,
  detailedRequirements: '',
  salaryInfo: '',
  filledStatus: '',
  expiredStatus: ''
})

const addInfo = async ()=>{
  let result = await addJobPostingService(addModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getInfo()
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>招聘信息管理</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加招聘信息</el-button>
        </div>
      </div>
    </template>
    <el-table :data="model" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="招聘编号" prop="postingId" > </el-table-column>
      <el-table-column label="岗位名称" prop="jobTitle" > </el-table-column>
      <el-table-column label="岗位类别编号" prop="categoryId" > </el-table-column>
      <el-table-column label="发布编号" prop="publicationId" > </el-table-column>
      <el-table-column label="发布时间" prop="publicationDate" > </el-table-column>
      <el-table-column label="点击量" prop="clickCount" > </el-table-column>
      <el-table-column label="用人单位编号" prop="companyId" > </el-table-column>
      <el-table-column label="详细要求" prop="detailedRequirements" show-overflow-tooltip="show-overflow-tooltip"> </el-table-column>
      <el-table-column label="薪酬信息" prop="salaryInfo" show-overflow-tooltip="show-overflow-tooltip"> </el-table-column>
      <el-table-column label="招满状态" prop="filledStatus" > </el-table-column>
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

  <el-drawer v-model="visibleDrawer" title="添加留言" direction="rtl" size="50%">
    <!-- 添加文章表单 -->
    <el-form :model="addModel" label-width="100px" >
      <el-form-item label="岗位名称" >
        <el-input v-model="addModel.jobTitle" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="岗位类别编号" >
        <el-input v-model="addModel.categoryId" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="发布编号" >
        <el-input v-model="addModel.publicationId" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="点击量" >
        <el-input v-model="addModel.clickCount" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="用人单位编号" >
        <el-input v-model="addModel.companyId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="详细要求" >
        <el-input type="textarea" v-model="addModel.detailedRequirements" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="薪酬信息" >
        <el-input type="textarea" v-model="addModel.salaryInfo" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="招满状态" >
        <el-radio-group v-model="addModel.filledStatus">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="过期状态" >
        <el-radio-group v-model="addModel.expiredStatus">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addInfo">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateModel" label-width="100px" >
      <el-form-item label="招聘编号" >
        <el-input v-model="updateModel.postingId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="岗位名称" >
        <el-input v-model="updateModel.jobTitle" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="岗位类别编号" >
        <el-input v-model="updateModel.categoryId" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="发布编号" >
        <el-input v-model="updateModel.publicationId" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" >
        <el-input v-model="updateModel.publicationDate" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="点击量" >
        <el-input v-model="updateModel.clickCount" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="用人单位编号" >
        <el-input v-model="updateModel.companyId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="详细要求" >
        <el-input type="textarea" v-model="updateModel.detailedRequirements" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="薪酬信息" >
        <el-input type="textarea" v-model="updateModel.salaryInfo" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="招满状态" >
        <el-radio-group v-model="updateModel.filledStatus">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="过期状态" >
        <el-radio-group v-model="updateModel.expiredStatus">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
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