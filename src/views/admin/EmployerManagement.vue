<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {deleteEmployerByCompanyIdService, searchAllEmployerService, updateEmployerService} from "@/api/employer.js";
import {ref} from "vue";
import useEmployerInfoStore from "@/stores/employerInfo.js";
import {ElMessage, ElMessageBox} from "element-plus";

//展示留言
const studentInfoStore = useEmployerInfoStore();
console.log('messageInfoStore.info：', studentInfoStore.info)
const employer = ref([])

const getInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchAllEmployerService();
    // 打印结果
    console.log('Result info:', result);
    employer.value = result.data;
    console.log('employer info:', employer);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

getInfo();

//删除留言
const deleteInfo = (row)=>{

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
        let result = await deleteEmployerByCompanyIdService(row.companyId)
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
  companyId: '',
  companyName: '',
  contactPerson: '',
  address: '',
  registrationTime: '',
  companyNature: '',
  email: '',
  scale: '',
  administratorId: '',
  contactPhone: '',
  reviewStatus: '',
  reviewTime: ''
})


const updateInfo = async (row)=>{
  let result = await updateEmployerService(updateModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getInfo()
}

const showUpdate = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateModel.value.companyId = row.companyId;
  updateModel.value.companyName = row.companyName;
  updateModel.value.contactPerson = row.contactPerson;
  updateModel.value.address = row.address;
  updateModel.value.registrationTime = row.registrationTime;
  updateModel.value.companyNature = row.companyNature;
  updateModel.value.email = row.email;
  updateModel.value.scale = row.scale;
  updateModel.value.administratorId = row.administratorId;
  updateModel.value.contactPhone = row.contactPhone;
  updateModel.value.reviewStatus = row.reviewStatus;
  updateModel.value.reviewTime = row.reviewTime;
}


</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有用人单位</span>
      </div>
    </template>
    <el-table :data="employer" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="企业编号" prop="companyId" width="100"> </el-table-column>
      <el-table-column label="企业名称" prop="companyName" width="100"> </el-table-column>
      <el-table-column label="联系人" prop="contactPerson" width="100"> </el-table-column>
      <el-table-column label="地址" prop="address" width="100"> </el-table-column>
      <el-table-column label="注册时间" prop="registrationTime" width="100"> </el-table-column>
      <el-table-column label="性质" prop="companyNature" width="100"> </el-table-column>
      <el-table-column label="电子邮箱" prop="email" width="100"> </el-table-column>
      <el-table-column label="规模" prop="scale" width="100"> </el-table-column>
      <el-table-column label="审核员编号" prop="administratorId" width="100"> </el-table-column>
      <el-table-column label="联系电话" prop="contactPhone" width="100"> </el-table-column>
      <el-table-column label="审核状态" prop="reviewStatus" width="100"> </el-table-column>
      <el-table-column label="审核时间" prop="reviewTime" width="100"> </el-table-column>
      <el-table-column label="操作" >
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showUpdate($event,row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteInfo(row)"></el-button>
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
      <el-form-item label="企业编号" >
        <el-input v-model="updateModel.companyId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="企业名称" >
        <el-input v-model="updateModel.companyName" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="联系人" >
        <el-input v-model="updateModel.contactPerson" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="地址" >
        <el-input v-model="updateModel.address" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="注册时间" >
        <el-input v-model="updateModel.registrationTime" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="性质" >
        <el-input v-model="updateModel.companyNature" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" >
        <el-input v-model="updateModel.email" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="规模" >
        <el-input v-model="updateModel.scale" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="审核员编号" >
        <el-input v-model="updateModel.administratorId" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="联系电话" >
        <el-input v-model="updateModel.contactPhone" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="招满状态" >
        <el-radio-group v-model="updateModel.reviewStatus">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核时间" >
        <el-input v-model="updateModel.reviewTime" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateInfo">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>

<style scoped lang="scss">

</style>