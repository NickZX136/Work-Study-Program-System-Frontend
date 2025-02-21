<script setup>
  import {administratorLoginService, administratorRegisterService} from "@/api/administrator.js"
  import {useRouter} from "vue-router";
  import {useTokenStore} from "@/stores/token.js";
  import { ElMessage } from 'element-plus';
  import { ref } from 'vue';
  import {Crop, Delete, Edit, EditPen, SwitchButton, User} from "@element-plus/icons-vue";
  import {employerLoginService, employerRegisterService} from "@/api/employer.js";

  const isRegister = ref(false)

  const registerData = ref({
    companyId:'',
    companyName:'',
    contactPerson:'',
    contactPhone:'',
    loginPassword:'',
    loginRePassword:''
  })

  //密码校验函数
  const rePasswordValid = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请再次确认密码'))
    } else if (value !== registerData.value.loginPassword) {
      callback(new Error("请确保两次输入的密码一致"))
    } else {
      callback()
    }
  }

  //定义表单校验规则
  const rules={
    companyId:[
      {required: true, message: '请输入用户名!', trigger: 'blur'},
      {min: 2, max: 10, message: '请输入长度为2-10位非空字符!', trigger: 'blur'}
    ],
    loginPassword:[
      {required: true, message: '请输入密码!', trigger: 'blur'},
      {min: 5, max: 16, message: '请输入长度为5-16位非空字符!', trigger: 'blur'}
    ],
    loginRePassword:[
      {validator: rePasswordValid, trigger: 'blur' }
    ]
  }

  //调用后台接口，实现注册
  const register = async()=>{

    let result = await employerRegisterService(registerData.value);
    console.log(result);
    // if(result.code === '0'){
    //   //成功
    //   alert(result.msg ? result.msg : '注册成功')
    // }else{
    //   //失败
    //   alert('注册失败')
    // }
    alert(result.msg ? result.msg : '注册成功')
  }



  const router = useRouter()
  const tokenStore = useTokenStore()
  const login = async()=>{
    let result = await employerLoginService(registerData.value);

    // if(result.code === '0'){
    //   //成功
    //   alert(result.msg ? result.msg : '注册成功')
    // }else{
    //   //失败
    //   alert('注册失败')
    // }

    ElMessage.success(result.msg ? result.msg : '登录成功')
    // alert(result.msg ? result.msg : '登录成功')

    //把得到的token存储到pinia中
    tokenStore.setToken(result.data)

    //跳转到首页
    router.push('/EmployerLayout')
  }


</script>

<template>
  <!-- 头部区域 -->
  <el-card>
    <h1>用人单位登录</h1>
    <el-row class="login-page">
      <el-col :span="12" class="bg"></el-col>
      <el-col :span="6" :offset="3" class="form">
        <!-- 注册表单 -->
        <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
          <el-form-item>
            <h1>注册</h1>
          </el-form-item>
          <el-form-item prop="companyId">
            <el-input :prefix-icon="User" placeholder="请输入公司ID" v-model="registerData.companyId"></el-input>
          </el-form-item>
          <el-form-item prop="loginPassword">
            <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.loginPassword"></el-input>
          </el-form-item>
          <el-form-item prop="loginRePassword">
            <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码" v-model="registerData.loginRePassword"></el-input>
          </el-form-item>
          <el-form-item prop="loginRePassword">
            <el-input :prefix-icon="Lock" placeholder="请输入公司名称" v-model="registerData.companyName"></el-input>
          </el-form-item>
          <el-form-item prop="loginRePassword">
            <el-input :prefix-icon="Lock" placeholder="请输入联系人" v-model="registerData.contactPerson"></el-input>
          </el-form-item>
          <el-form-item prop="loginRePassword">
            <el-input :prefix-icon="Lock" placeholder="请输入联系电话" v-model="registerData.contactPhone"></el-input>
          </el-form-item>
          <!-- 注册按钮 -->
          <el-form-item>
            <el-button class="button" type="primary" auto-insert-space @click="register">
              注册
            </el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = false">
              ← 返回
            </el-link>
          </el-form-item>
        </el-form>
        <!-- 登录表单 -->
        <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
          <el-form-item>
            <h1>登录</h1>
          </el-form-item>
          <el-form-item prop="companyId">
            <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.companyId"></el-input>
          </el-form-item>
          <el-form-item prop="loginPassword">
            <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码" v-model="registerData.loginPassword"></el-input>
          </el-form-item>
          <el-form-item class="flex">
            <div class="flex">
              <el-checkbox>记住我</el-checkbox>
              <el-link type="primary" :underline="false">忘记密码？</el-link>
            </div>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
          </el-form-item>
          <el-form-item class="flex">
            <el-link type="info" :underline="false" @click="isRegister = true">
              注册 →
            </el-link>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>

</template>

<!--<script>-->
<!--import { ref } from 'vue'-->
<!--import { ElMessage } from 'element-plus'-->

<!--export default {-->
<!--  setup() {-->
<!--    const form = ref({-->
<!--      username: '',-->
<!--      password: '',-->
<!--      checkPass: ''-->
<!--    })-->

<!--    const submitForm = () => {-->
<!--      if (form.value.password !== form.value.checkPass) {-->
<!--        ElMessage.error('两次输入的密码不一致!')-->
<!--        return-->
<!--      }-->
<!--      // 这里添加提交表单的逻辑-->
<!--      console.log('Submitted:', form.value)-->
<!--    }-->

<!--    return {-->
<!--      form,-->
<!--      submitForm-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<style lang="scss" scoped>
/* 样式 */
.login-page {
  //height: 100vh;
  background-color: #fff;

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}

//.el-header {
//  background-color: #fff;
//  display: flex;
//  align-items: center;
//  justify-content: space-between;
//
//  .el-dropdown__box {
//    display: flex;
//    align-items: center;
//
//    .el-icon {
//      color: #999;
//      margin-left: 10px;
//    }
//
//    &:active,
//    &:focus {
//      outline: none;
//    }
//  }
//}
</style>
