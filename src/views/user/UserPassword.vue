<template>
  <page-container title="重置密码">
    <el-form :model="form" ref="formRef" label-width="120px" class="reset-password-form">
      <el-form-item label="旧密码" prop="oldPassword" :rules="oldPasswordRules">
        <el-input type="password" v-model="form.oldPassword" placeholder="请输入旧密码" />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" :rules="newPasswordRules">
        <el-input type="password" v-model="form.newPassword" placeholder="请输入新密码" />
      </el-form-item>
      <el-form-item label="确认新密码" prop="confirmPassword" :rules="confirmPasswordRules">
        <el-input type="password" v-model="form.confirmPassword" placeholder="请确认新密码" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="resetPassword">提交</el-button>
      </el-form-item>
    </el-form>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { resetPasswordService } from '@/api/user'
const formRef = ref(null)
const form = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const oldPasswordRules = [{ required: true, message: '请输入旧密码', trigger: 'blur' }]

const newPasswordRules = [
  { required: true, message: '请输入新密码', trigger: 'blur' },
  { min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' }
]

const confirmPasswordRules = [
  { required: true, message: '请确认新密码', trigger: 'blur' },
  {
    validator: (rule, value, callback) => {
      if (value !== form.value.newPassword) {
        callback(new Error('确认密码与新密码不一致'))
      } else {
        callback()
      }
    },
    trigger: 'blur'
  }
]

const resetPassword = async () => {
  await formRef.value.validate() // 校验表单
  console.log(form.value)

  const res = await resetPasswordService({
    old_pwd: form.value.oldPassword,
    new_pwd: form.value.newPassword,
    re_pwd: form.value.confirmPassword
  }) // 调用重置密码接口
  console.log(res)

  ElMessage.success('密码重置成功')
  // 重置表单
  form.value.oldPassword = ''
  form.value.newPassword = ''
  form.value.confirmPassword = ''
}
</script>

<style lang="scss" scoped>
.reset-password-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
