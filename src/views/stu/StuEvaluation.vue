<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {
  addEvaluationService,
  deleteEvaluationByEvaluationIdService,
  searchAllEvaluationService, searchByCompanyIdEvaluationService, searchByStudentIdEvaluationService,
  updateEvaluationService
} from "@/api/evaluation.js";
import {ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import useStudentInfoStore from "@/stores/studentInfo.js";

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
    let result = await searchByStudentIdEvaluationService(userInfo.value.studentId);
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
        let result = await deleteEvaluationByEvaluationIdService(row.evaluationId)
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
  evaluationId: '',
  studentId: userInfo.value.studentId,
  companyId: '',
  stuScore: '',
  companyScore: '',
  content: ''

})

const updateInfo = async (row)=>{
  let result = await updateEvaluationService(updateModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getInfo()
}

const showUpdate = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateModel.value.evaluationId = row.evaluationId;
  updateModel.value.studentId = row.studentId;
  updateModel.value.companyId = row.companyId;
  updateModel.value.stuScore = row.stuScore;
  updateModel.value.companyScore = row.companyScore;
  updateModel.value.content = row.content;

}


//增加留言

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const addModel = ref({
  studentId: userInfo.value.studentId,
  companyId: '',
  stuScore: '',
  companyScore: '',
  content: '',
})

const addInfo = async ()=>{
  let result = await addEvaluationService(addModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getInfo()
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有评分管理</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加评分</el-button>
        </div>
      </div>
    </template>
    <el-table :data="model" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="评价编号" prop="evaluationId" > </el-table-column>
<!--      <el-table-column label="评价方ID" prop="studentId" > </el-table-column>-->
      <el-table-column label="被评价方ID" prop="companyId" > </el-table-column>
      <el-table-column label="学生分数" prop="stuScore" > </el-table-column>
      <el-table-column label="用人单位分数" prop="companyScore" > </el-table-column>
      <el-table-column label="评价内容" prop="content" > </el-table-column>
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
<!--      <el-form-item label="学生ID" >-->
<!--        <el-input v-model="addModel.studentId" placeholder="请输入内容"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="被评价方ID" >
        <el-input v-model="addModel.companyId" placeholder="请输入内容"></el-input>
      </el-form-item>
<!--      <el-form-item label="学生分数" >-->
<!--        <el-input v-model="addModel.stuScore" placeholder="请输入内容"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="用人单位分数" >
        <el-input v-model="addModel.companyScore" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="评价内容" >
        <el-input type="textarea" v-model="addModel.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addInfo">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateModel" label-width="100px" >
      <el-form-item label="评价编号" >
        <el-input v-model="updateModel.evaluationId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
<!--      <el-form-item label="学生ID" >-->
<!--        <el-input v-model="updateModel.studentId" placeholder="请输入标题" disabled="disabled"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="被评价方ID" >
        <el-input v-model="updateModel.companyId" placeholder="请输入标题"></el-input>
      </el-form-item>
<!--      <el-form-item label="学生分数" >-->
<!--        <el-input v-model="updateModel.stuScore" placeholder="请输入标题"></el-input>-->
<!--      </el-form-item>-->
      <el-form-item label="用人单位分数" >
        <el-input v-model="updateModel.companyScore" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="评价内容" >
        <el-input v-model="updateModel.content" placeholder="请输入标题"></el-input>
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