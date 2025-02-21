<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import useJobCategoryInfoStore from "@/stores/jobCategoryInfo.js";
import {ref} from "vue";
import {
  searchAllJobCategoryService, searchJobCategoryByJobCategoryNameService,
} from "@/api/jobCategory.js";


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

getInfo();


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
      </div>
    </template>
    <el-table :data="model" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="岗位类别编号" prop="categoryId" > </el-table-column>
      <el-table-column label="类别名称" prop="categoryName" > </el-table-column>
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