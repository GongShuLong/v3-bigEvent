<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { editUserInfoService } from '@/api/user'

const userStore = useUserStore()
const formRef = ref()
const form = ref({
  username: '',
  nickname: '',
  email: ''
})
// 个人信息回显
form.value = userStore.user

//  信息校验
const rules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度应在 2 到 10 位之间', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
  ]
}

const submitForm = async () => {
  formRef.value.validate(async (valid) => {
    if (valid) {
      // alert('提交成功!');
      // 在这里处理提交逻辑
      await editUserInfoService(form.value)
      userStore.getUser()
      ElMessage.success('修改成功')
    } else {
      console.log('校验失败!')
      return false
    }
  })
}
</script>

<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
    <el-form-item label="登录名称">
      <el-input v-model="form.username" disabled></el-input>
    </el-form-item>

    <el-form-item label="用户昵称" prop="nickname">
      <el-input v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item label="用户邮箱" prop="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">提交修改</el-button>
    </el-form-item>
  </el-form>
</template>
