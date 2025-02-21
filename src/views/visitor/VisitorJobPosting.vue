<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import useJobPostingInfoStore from "@/stores/jobPostingInfo.js";
import {
  addJobPostingService,
  deleteJobPostingByPostingIdService,
  searchAllJobPostingService, searchByCategoryNameJobPostingService,
  updateJobPostingService
} from "@/api/jobPosting.js";
import {ElMessage, ElMessageBox} from "element-plus";
import useEmployerInfoStore from "@/stores/employerInfo.js";

//展示留言
const infoStore = useJobPostingInfoStore();
const model = ref([])

const getInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchAllJobPostingService();
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

const searchQuery = ref('');
const search = async () => {
  try {
    let result;
    if (searchQuery.value.trim() !== '') {
      result = await searchByCategoryNameJobPostingService(searchQuery.value.trim());
    } else {
      result = await searchAllJobPostingService();
    }
    model.value = result.data;
  } catch (error) {
    console.error('Error while searching job categories:', error);
  }
}

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有招聘信息</span>
        <div>
          <el-input v-model="searchQuery" placeholder="请输入岗位类别名称" style="width: 200px; padding-right: 10px"></el-input>
          <el-button type="primary" @click="search">搜索</el-button>
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
      <!--      <el-table-column label="操作" >-->
      <!--        <template #default="{ row }">-->
      <!--          <el-button :icon="Edit" circle plain type="primary" @click="showUpdate($event, row)"></el-button>-->
      <!--          <el-button :icon="Delete" circle plain type="danger" @click="deleteInfo($event, row)"></el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

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