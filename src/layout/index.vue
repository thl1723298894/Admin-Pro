<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="/" router>
          <el-menu-item index="/"> 项目介绍 </el-menu-item>
          <el-menu-item index="/user"> 用户列表 </el-menu-item>
          <el-menu-item index="/role"> 角色列表 </el-menu-item>
          <el-menu-item index="/auth"> 权限列表 </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <route-tags></route-tags>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts" setup>
import Header from "./components/Header.vue";
import RouteTags from "./components/RouteTags.vue";
</script>
<style lang="less" scoped>
.el-header {
  padding: 0;
  margin-bottom: 5px;
}

.el-container {
  height: 100%;

  .el-menu {
    height: 100%;
  }
}
</style>
