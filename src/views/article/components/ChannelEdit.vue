<script setup>
import { ref } from 'vue'
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const open = (row) => {
  dialogVisible.value = true
  // console.log(row)
  formModel.value = { ...row }
}
// 定义校验规则
const rules = {
  cate_name: [
    { required: true, message: '长度须为3-10位', trigger: 'blur' },
    { pattern: /^\s{3,10}$/, message: '分类名称必须是3-10位的非空字符', trigger: "'blur'" }
  ],
  cate_alias: [
    { required: true, message: '长度须为1-15位', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类名称必须是1-15位的字母或数字', trigger: "'blur'" }
  ]
}
defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑' : '添加'" width="30%">
    <!-- <span>我是内容部分</span> -->
    <el-form :rules="rules" :module="formModel" style="padding: 0 10%">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取消</el-button> -->
        <!-- <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button> -->
      </div>
    </template>
  </el-dialog>
</template>
