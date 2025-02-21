<script setup>

import {Delete, Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import useStudentInfoStore from "@/stores/studentInfo.js";
import {deleteStudentByStudentIdService, searchAllStudentService, updateStudentService} from "@/api/student.js";
import {ElMessage, ElMessageBox} from "element-plus";

//展示留言
const studentInfoStore = useStudentInfoStore();
console.log('messageInfoStore.info：', studentInfoStore.info)
const student = ref([])

const getStudentInfo = async()=>{
  //调用接口
  try {
    // 调用接口并获取结果
    let result = await searchAllStudentService();
    // 打印结果
    console.log('Result info:', result);
    student.value = result.data;
    console.log('student info:', student);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }
}

getStudentInfo();

//删除留言
const deleteStudent = (row)=>{

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
        let result = await deleteStudentByStudentIdService(row.studentId)
        ElMessage.success(result.message?result.message:'删除成功')
        getStudentInfo()
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
const updateStudentModel = ref({
  studentId: '',
  studentName: '',
  sex: '',
  nation: '',
  nativePlace: '',
  birthDate: '',
  politicalStatus: ''
})


const updateStudent = async (row)=>{
  let result = await updateStudentService(updateStudentModel.value)
  ElMessage.success(result.msg ? result.msg : '修改成功')
  updateVisibleDrawer.value = false
  getStudentInfo()
}

const showUpdateMessage = (event, row) =>{
  event.stopPropagation();
  updateVisibleDrawer.value = true
  updateStudentModel.value.studentId = row.studentId;
  updateStudentModel.value.studentName = row.studentName;
  updateStudentModel.value.sex = row.sex;
  updateStudentModel.value.nation = row.nation;
  updateStudentModel.value.nativePlace = row.nativePlace;
  updateStudentModel.value.birthDate = row.birthDate;
  updateStudentModel.value.politicalStatus = row.politicalStatus;
}

console.log(updateStudentModel.value.birthDate)

</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span>所有学生</span>
      </div>
    </template>
    <el-table :data="student" style="width: 100%">
      <el-table-column label="编号" width="100" type="index"> </el-table-column>
      <el-table-column label="学号" prop="studentId" width="100"> </el-table-column>
      <el-table-column label="姓名" prop="studentName" width="100"> </el-table-column>
      <el-table-column label="性别" prop="sex" show-overflow-tooltip="show-overflow-tooltip"></el-table-column>
      <el-table-column label="民族" prop="nation"></el-table-column>
      <el-table-column label="籍贯" prop="nativePlace"></el-table-column>
      <el-table-column label="出生日期" prop="birthDate"></el-table-column>
      <el-table-column label="政治面貌" prop="politicalStatus"></el-table-column>
      <el-table-column label="操作" >
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain type="primary" @click="showUpdateMessage($event,row)"></el-button>
          <el-button :icon="Delete" circle plain type="danger" @click="deleteStudent(row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </el-card>

  <el-drawer v-model="updateVisibleDrawer" title="修改留言" direction="rtl" size="50%">
    <!-- 修改文章表单 -->
    <el-form :model="updateStudentModel" label-width="100px" >
      <el-form-item label="学号" >
        <el-input v-model="updateStudentModel.studentId" placeholder="请输入标题" disabled="disabled"></el-input>
      </el-form-item>
      <el-form-item label="姓名" >
        <el-input v-model="updateStudentModel.studentName" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="性别" >
        <el-radio-group v-model="updateStudentModel.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="民族" >
        <el-input v-model="updateStudentModel.nation" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item label="籍贯" >
        <el-input v-model="updateStudentModel.nativePlace" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <!--Todo:这里可以改成选日期的element-->
      <el-form-item label="出生日期" >
        <el-input v-model="updateStudentModel.birthDate" placeholder="请输入标题" ></el-input>
<!--        <el-date-picker-->
<!--            v-model="updateStudentModel.birthDate"-->
<!--            type="datetime"-->
<!--            placeholder="Pick a day"-->
<!--            :size="size"-->
<!--        />-->
      </el-form-item>
      <el-form-item label="政治面貌" >
        <el-input v-model="updateStudentModel.politicalStatus" placeholder="请输入标题" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateStudent">确认修改</el-button>
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