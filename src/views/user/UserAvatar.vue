<template>
  <page-container title="更换头像">
    <div class="avatar-container">
      <!-- 显示头像，确保图片为圆形且按比例裁剪 -->
      <el-image v-if="imgUrl" :src="imgUrl" fit="cover" width="100" height="100" class="avatar-preview" />

      <div class="avatar-buttons">
        <!-- 选择头像按钮，绑定 on-change 事件来处理文件选择 -->
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          accept="image/*"
          :show-file-list="false"
          :on-change="handleChange"
        >
          <el-button type="primary">选择头像</el-button>
        </el-upload>

        <!-- 提交按钮 -->
        <el-button type="success" @click="submitAvatar">提交头像</el-button>
      </div>
    </div>
  </page-container>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { editUserAvatarService, userInfoServiec } from '@/api/user'
import { ElMessage } from 'element-plus'

const imgUrl = ref() // 用于图片预览
const base64Avatar = ref('') // 用于存储 Base64 编码的字符串
const userStore = useUserStore()

// 读取用户初始头像
// 初始化用户头像
const getUserInfoService = async () => {
  const { data } = await userInfoServiec()
  return data
}

const initAvatar = async () => {
  const user = await getUserInfoService()
  imgUrl.value = user.data.user_pic
}

initAvatar()
// 初始化用户头像
imgUrl.value = userStore.user.user_pic
// 处理文件选择，将图片转为 Base64 编码并显示预览
const handleChange = (file) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    imgUrl.value = e.target.result // 更新 imgUrl 显示图片预览
    base64Avatar.value = e.target.result // 获取 Base64 编码的字符串（保留前缀）
  }

  reader.readAsDataURL(file.raw) // 使用 file.raw 读取文件内容并转换为 Base64
}

// 提交头像修改
const submitAvatar = async () => {
  try {
    // 将 Base64 编码的头像字符串提交到后端
    await editUserAvatarService({ avatar: base64Avatar.value })
    ElMessage.success('头像修改成功')

    // 获取最新用户信息
    await userInfoServiec()

    // 直接使用新头像的 URL，更新 imgUrl
    window.location.reload()
  } catch (error) {
    ElMessage.error('头像修改失败')
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.avatar-preview {
  border-radius: 50%; // 将头像裁剪为圆形
  object-fit: cover; // 保证图片按比例显示，不拉伸
  width: 200px;
  height: 200px;
  margin-bottom: 20px;
}

.avatar-buttons {
  display: flex;
  justify-content: center;
  gap: 10px; // 按钮之间的间距
}
</style>
