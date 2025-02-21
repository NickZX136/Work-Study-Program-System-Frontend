<script setup>

import router from "@/router/index.js";
import {searchMessageByMessageIdService} from "@/api/message.js";
import {ref, toRef} from "vue";
import {useRoute} from "vue-router";
import {Delete, Edit} from "@element-plus/icons-vue";
import {
  addRevertService,
  deleteRevertByRevertIdService,
  searchAllRevertService,
  updateRevertService
} from "@/api/revert.js";
import useAdminInfoStore from "@/stores/adminInfo.js";
import {ElMessage, ElMessageBox} from "element-plus";
import useEmployerInfoStore from "@/stores/employerInfo.js";
import useStudentInfoStore from "@/stores/studentInfo.js";

const goBack = () => {
  // 返回上一个页面
  router.go(-1);
};


const route = useRoute();
const messageId = ref(route.query.messageId);
console.log('messageId info:', messageId);
console.log('messageId.value info:', messageId.value);

const getMessageInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchMessageByMessageIdService(messageId.value);
    // 打印结果
    console.log('Result info:', result);
    messageModel.value = result.data;

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

getMessageInfo()

const messageModel = ref({
  messageId: '',
  title: '',
  content: '',
  writer: '',
  writeDate: ''
})


const revert = ref([])

const getRevertInfo = async(messageId)=>{
  //调用接口
  try {
    console.log('messageId info:', messageId);
    // 调用接口并获取结果
    let result = await searchAllRevertService(messageId.value);
    // 打印结果
    console.log('Result2 info:', result);
    revert.value = result.data;
    console.log('Message info:', revert);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

getRevertInfo(messageId)

//控制添加弹窗
const InfoStore = useStudentInfoStore();

const userInfo = ref({
  ...InfoStore.info
})

const studentId = userInfo.value.studentId

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const revertModel = ref({
  messageId: messageId.value,
  content: '',
  writer: studentId
})

//增加留言
const addRevert = async ()=>{

  let result = await addRevertService(revertModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getRevertInfo(messageId)
}

//修改留言
const updateVisibleDrawer = ref(false)
const updateRevertModel = ref({
  revertId: '',
  messageId: messageId.value,
  content: '',
  writer: studentId,
  writeDate: ''
})
const showUpdateRevert = (row)=>{

  if(userInfo.value.studentId===row.writer){
    updateVisibleDrawer.value = true
    updateRevertModel.value.revertId = row.revertId;
    updateRevertModel.value.content = row.content;
    updateRevertModel.value.writer = row.writer;
    updateRevertModel.value.writeDate = row.writeDate;
  }else{
    ElMessageBox.alert('您不是这个回复的作者，无法修改', '提示', {
      confirmButtonText: 'OK',
    })
  }

}

const updateMessage = async (row)=>{
  let result = await updateRevertService(updateRevertModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getRevertInfo(messageId)
}

//删除留言
const deleteMessage = (row)=>{

  if(userInfo.value.studentId===row.writer){
    ElMessageBox.confirm(
        '你确认删除该回复信息吗？',
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          //用户点击了确认
          let result = await deleteRevertByRevertIdService(row.revertId)
          ElMessage.success(result.message?result.message:'删除成功')
          getRevertInfo(messageId)
        })
        .catch(() => {
          //用户点击了取消
          ElMessage({
            type: 'info',
            message: '取消删除',
          })
        })
  }else {
    ElMessageBox.alert('您不是这个回复的作者，无法删除', '提示', {
      confirmButtonText: 'OK',
    })
  }

}

</script>


<template>
  <el-card class="page-container" >
    <template #header>
      <div class="header">
        <span></span>
        <div class="extra">
          <el-button type="primary" @click="goBack">返回</el-button>
        </div>
      </div>
    </template>
    <div class="title-author-container">
      <el-text class="title mx-5" style="font-size: 30px; text-align: left; font-weight: bold">{{messageModel.title}}</el-text>
      <el-text class="author mx-5" style="font-size: 20px; text-align: right">作者：{{messageModel.writer}}</el-text>
    </div>
    <el-divider />
    <el-text class="mx-5" style="font-size: 18px">{{messageModel.content}}</el-text>
  </el-card>

  <span></span>

  <el-card class="page-container" style="margin-top: 20px">
    <template #header>
      <div class="header">
        <span>回复</span>
        <div class="extra">
          <el-button  type="primary" @click="visibleDrawer = true">添加留言</el-button>
        </div>
      </div>
    </template>

    <el-table :data="revert" style="width: 100%" >
      <el-table-column label="编号" prop="revertId" width="100" type="index"> </el-table-column>
      <el-table-column label="回复ID" prop="revertId" width="100"> </el-table-column>
      <el-table-column label="内容" prop="content" show-overflow-tooltip="show-overflow-tooltip"></el-table-column>
      <el-table-column label="作者" prop="writer"></el-table-column>
      <el-table-column label="发布时间" prop="writeDate"></el-table-column>
      <el-table-column label="操作" >
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showUpdateRevert(row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteMessage(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

  <el-drawer v-model="visibleDrawer" title="添加留言" direction="rtl" size="50%">
    <!-- 添加文章表单 -->
    <el-form :model="revertModel" label-width="100px" >
      <el-form-item label="内容" >
        <el-input type="textarea" v-model="revertModel.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addRevert">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateRevertModel" label-width="100px" >
      <el-form-item label="留言ID" >
        <el-input v-model="updateRevertModel.revertId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="内容" >
        <el-input type="textarea" v-model="updateRevertModel.content" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="作者" >
        <el-input v-model="updateRevertModel.writer" placeholder="请输入内容" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" >
        <el-input v-model="updateRevertModel.writeDate" placeholder="请输入内容" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateMessage">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

</template>

<style scoped lang="scss">
.title-author-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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