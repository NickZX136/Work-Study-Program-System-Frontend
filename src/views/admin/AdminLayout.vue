<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom
} from '@element-plus/icons-vue'

import {administratorInfoService} from "@/api/administrator.js";
import useAdminInfoStore from '@/stores/adminInfo.js'
import {useRouter} from "vue-router";
import {useTokenStore} from "@/stores/token.js";
import {ElMessage, ElMessageBox} from "element-plus";

const adminInfoStore = useAdminInfoStore();
//调用函数，获取用户详细信息
const getAdminInfo = async()=>{
  //调用接口
  // let result = await administratorInfoService;
  try {
    // 调用接口并获取结果
    let result = await administratorInfoService();
    // 打印结果
    console.log('Administrator info:', result);

    adminInfoStore.setInfo(result.data);

  } catch (error) {
    // 如果发生错误，打印错误信息
    console.error('Error while fetching administrator info:', error);
  }

}

getAdminInfo();

//条目被点击后，调用的函数
const router = useRouter();
const tokenStore = useTokenStore();
const handleCommand = (command)=>{
  if(command === 'logout'){
    //退出登录
    ElMessageBox.confirm(
        '你确认退出登录吗？',
        '温馨提示',
        {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
    )
        .then(async () => {
          //用户点击了确认
          //清空pinia中的token和个人信息
          tokenStore.removeToken()
          adminInfoStore.removeInfo()
          //跳转到登录页
          router.push('/LoginLayout')
          ElMessage({
            type: 'success',
            message: '退出登录成功',
          })
        })
        .catch(() => {
          //用户点击了取消
          ElMessage({
            type: 'info',
            message: '取消退出',
          })
        })
  }else{
    //路由
    router.push('/admin/'+command)
  }
}

</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
               router>
        <el-menu-item index="/admin/MessageManagement">
          <el-icon>
            <Management />
          </el-icon>
          <span>留言管理</span>
        </el-menu-item >
        <el-menu-item index="/admin/StudentManagement">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>学生管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/RecruitmentInformationManagement">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>招聘信息管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/ScoreManagement">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>评分管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/EmployerManagement">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>用人单位管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/JobCategoryManagement">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>岗位类别管理</span>
        </el-menu-item>
        <el-sub-menu>
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>个人中心</span>
          </template>
          <el-menu-item index="/admin/AdministratorInfo">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/admin/AdministratorUpdatePassword">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>
        <div></div>
        <el-dropdown placement="bottom-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="avatar" />
                      <div style="margin-left: 10px"><strong>{{ adminInfoStore.info.administratorName }}</strong></div>
                        <el-icon>
                            <CaretBottom />
                        </el-icon>

                    </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="AdministratorInfo" :icon="User">基本资料</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen">重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 中间区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
      <!-- 底部区域 -->
      <el-footer>勤工助学系统 ©2024 Created by Nick</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    //&__logo {
    //  height: 120px;
    //  background: url('@/assets/logo.png') no-repeat center / 120px auto;
    //}

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>