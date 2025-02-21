<script setup>

import {
  CaretBottom,
  Crop,
  EditPen,
  Management,
  Promotion,
  SwitchButton,
  User,
  UserFilled
} from "@element-plus/icons-vue";
</script>

<template>
  <el-container class="layout-container">
    <!-- 左侧菜单 -->
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu active-text-color="#ffd04b" background-color="#232323"  text-color="#fff"
               router>
        <el-menu-item index="/admin/Login">
          <el-icon>
            <Management />
          </el-icon>
          <span>管理员登录</span>
        </el-menu-item >
        <el-menu-item index="/employer/EmployerLogin">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>用人单位登录</span>
        </el-menu-item>
        <el-menu-item index="/stu/StuLogin">
          <el-icon>
            <Promotion />
          </el-icon>
          <span>学生用户登录</span>
        </el-menu-item>
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>访客</span>
          </template>
          <el-menu-item index="/visitor/VisitorJobPosting">
            <el-icon>
              <User />
            </el-icon>
            <span>招聘信息</span>
          </el-menu-item>
          <el-menu-item index="/visitor/VisitorJobCategory">
            <el-icon>
              <Crop />
            </el-icon>
            <span>岗位信息</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <!-- 右侧主区域 -->
    <el-container>
      <!-- 头部区域 -->
      <el-header>

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

<style scoped lang="scss">
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