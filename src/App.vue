<script setup>
// import { useUserStore } from '@/stores/modules/user'
import { useUserStore } from './stores'
const userStore = useUserStore()
</script>

<template>
  <router-view></router-view>
  <hr />
  <hr />
  <hr />
  <div>app</div>
  <hr />
  <text-demo></text-demo>
  <hr />
  <el-button> 去首页</el-button>
  <el-button> 去登录</el-button>
  <el-button> 返回上一页</el-button>
  <hr />
  {{ userStore.token }}
  <el-button type="success" @click="userStore.setToken('asdaadasdad')">
    设置
  </el-button>
  <el-button type="primary" @click="userStore.setToken('')">删除</el-button>
</template>

<style scoped></style>
