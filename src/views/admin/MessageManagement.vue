<script setup>
import {
  Edit,
  Delete
} from '@element-plus/icons-vue'
import useMessageInfoStore from "@/stores/messageInfo.js";
import {
  addMessageService,
  deleteMessageByMessageIdService,
  searchAllMessageService,
  updateMessageService
} from "@/api/message.js";
import {ElMessage, ElMessageBox} from "element-plus";
import useAdminInfoStore from "@/stores/adminInfo.js";
import {ref} from "vue";
import router from "@/router/index.js";

//展示留言
const messageInfoStore = useMessageInfoStore();
console.log('messageInfoStore.info：', messageInfoStore.info)
const message = ref([])

const getMessageInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchAllMessageService();
    // 打印结果
    console.log('Result info:', result);
    message.value = result.data;
    console.log('Message info:', message);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

getMessageInfo();

//删除留言
const deleteMessage = (event, row)=>{

  event.stopPropagation();
      ElMessageBox.confirm(
          '你确认删除该留言信息吗？',
          '温馨提示',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(async () => {
            //用户点击了确认
            let result = await deleteMessageByMessageIdService(row.messageId)
            ElMessage.success(result.message?result.message:'删除成功')
            getMessageInfo()
          })
          .catch(() => {
            //用户点击了取消
            ElMessage({
              type: 'info',
              message: '取消删除',
            })
          })

}


//增加留言
//控制添加弹窗
const adminInfoStore = useAdminInfoStore();

const userInfo = ref({
  ...adminInfoStore.info
})

const adminId = userInfo.value.administratorId

//控制抽屉是否显示
const visibleDrawer = ref(false)
//添加留言模型
const messageModel = ref({
  title: '',
  content: '',
  writer: adminId,
})

const addMessage = async ()=>{
  let result = await addMessageService(messageModel.value)

  ElMessage.success(result.msg ? result.msg : '添加成功')
  visibleDrawer.value = false
  getMessageInfo()
}

//修改留言
const updateVisibleDrawer = ref(false)
const updateMessageModel = ref({
  messageId: '',
  title: '',
  content: '',
  writer: '',
  writeDate: ''
})


const updateMessage = async (row)=>{
  let result = await updateMessageService(updateMessageModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getMessageInfo()
}

const showUpdateMessage = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateMessageModel.value.messageId = row.messageId;
  updateMessageModel.value.title = row.title;
  updateMessageModel.value.content = row.content;
  updateMessageModel.value.writer = row.writer;
  updateMessageModel.value.writeDate = row.writeDate;
}

// 编程式导航至留言详情页面，并传递消息ID
const showMessageDetail = (row) => {
  // 编程式导航到消息详情页面，并将消息 ID 作为参数传递
  router.push({ path: '/admin/MessageManagementDetail', query: { messageId: row.messageId } });
};

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有留言</span>
        <div class="extra">
          <el-button type="primary" @click="visibleDrawer = true">添加留言</el-button>
        </div>
      </div>
    </template>
    <el-table :data="message" style="width: 100%" @row-click="showMessageDetail">
      <el-table-column label="编号" prop="messageId" width="100" type="index"> </el-table-column>
      <el-table-column label="留言ID" prop="messageId" width="100"> </el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="内容" prop="content" show-overflow-tooltip="show-overflow-tooltip"></el-table-column>
      <el-table-column label="作者" prop="writer"></el-table-column>
      <el-table-column label="发布时间" prop="writeDate"></el-table-column>
      <el-table-column label="操作" >
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showUpdateMessage($event, row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteMessage($event, row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

  <el-drawer v-model="visibleDrawer" title="添加留言" direction="rtl" size="50%">
    <!-- 添加文章表单 -->
    <el-form :model="messageModel" label-width="100px" >
      <el-form-item label="标题" >
        <el-input v-model="messageModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" >
        <el-input type="textarea" v-model="messageModel.content" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMessage">发布</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateMessageModel" label-width="100px" >
      <el-form-item label="留言ID" >
        <el-input v-model="updateMessageModel.messageId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="标题" >
        <el-input v-model="updateMessageModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" >
        <el-input v-model="updateMessageModel.content" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="作者" >
        <el-input type="textarea" v-model="updateMessageModel.writer" placeholder="请输入内容" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="发布时间" >
        <el-input type="textarea" v-model="updateMessageModel.writeDate" placeholder="请输入内容" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateMessage">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>

</template>

<style lang="scss" scoped>

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