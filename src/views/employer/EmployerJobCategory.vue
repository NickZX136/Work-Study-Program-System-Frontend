<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import useJobCategoryInfoStore from "@/stores/jobCategoryInfo.js";
import {ref} from "vue";
import {
  addJobCategoryService,
  deleteJobCategoryByCategoryIdService,
  searchAllJobCategoryService, searchJobCategoryByJobCategoryNameService,
  updateJobCategoryService
} from "@/api/jobCategory.js";
import {ElMessage, ElMessageBox} from "element-plus";


//展示留言
const infoStore = useJobCategoryInfoStore();
const model = ref([])
const searchQuery = ref('');

const getInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchAllJobCategoryService();
    // 打印结果
    console.log('Result info:', result);
    model.value = result.data;
    console.log('Message info:', model);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

const search = async () => {
  try {
    let result;
    if (searchQuery.value.trim() !== '') {
      result = await searchJobCategoryByJobCategoryNameService(searchQuery.value.trim());
    } else {
      result = await searchAllJobCategoryService();
    }
    model.value = result.data;
  } catch (error) {
    console.error('Error while searching job categories:', error);
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
        let result = await deleteJobCategoryByCategoryIdService(row.categoryId)
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
  categoryId: '',
  categoryName: '',

})

const updateInfo = async (row)=>{
  let result = await updateJobCategoryService(updateModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getInfo()
}

const showUpdate = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateModel.value.categoryId = row.categoryId;
  updateModel.value.categoryName = row.categoryName;
}

//增加留言

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const addModel = ref({
  categoryName: ''
})

const addInfo = async ()=>{
  let result = await addJobCategoryService(addModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getInfo()
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有岗位类别</span>
        <div>
          <el-input v-model="searchQuery" placeholder="请输入类别名称" style="width: 200px; padding-right: 10px"></el-input>
          <el-button type="primary" @click="search">搜索</el-button>
        </div>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加岗位类别</el-button>
        </div>
      </div>
    </template>
    <el-table :data="model" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="岗位类别编号" prop="categoryId" > </el-table-column>
      <el-table-column label="类别名称" prop="categoryName" > </el-table-column>
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
      <el-form-item label="类别名称" >
        <el-input type="textarea" v-model="addModel.categoryName" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addInfo">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateModel" label-width="100px" >
      <el-form-item label="留言ID" >
        <el-input v-model="updateModel.categoryId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="标题" >
        <el-input v-model="updateModel.categoryName" placeholder="请输入标题"></el-input>
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