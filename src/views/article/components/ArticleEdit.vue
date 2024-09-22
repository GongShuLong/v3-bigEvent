<!-- 抽屉组件 -->
<script setup>
import { ref } from 'vue'
import ChannelSelect from './ChannelSelect.vue'
import { Plus } from '@element-plus/icons-vue'
import { nextTick } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { artAddArticleService, artGetDetailService, artUpdateArticleService } from '@/api/article'

const visibilityBinding = ref(false)
// const defaultData = ref({
//   title: '',
//   cate_id: '',
//   content: '',
//   cover_img: '', //文章封面，file对象
//   state: ''
// })
const formRef = ref()
const formModel = ref({
  id: '',
  title: '',
  cate_id: '',
  content: '',
  cover_img: '', //文章封面，file对象
  state: ''
})
// 头像
const imgUrl = ref('')
const onUploadFile = (uploadFile) => {
  imgUrl.value = URL.createObjectURL(uploadFile.raw)
  formModel.value.cover_img = uploadFile.raw
}
//文章详情
// const articleDetail = ref({})
const baseURL = 'http://big-event-vue-api-t.itheima.net'

// 拼接图片地址
const getFullImageUrl = (relativePath) => {
  return `${baseURL}${relativePath}`
}

// 示例：假设你拿到的图片路径是 '/uploads/image.jpg'
// 回显数据
const articleDetail = ref({})
const getArticleDetail = async (id) => {
  try {
    const res = await artGetDetailService(id) // 使用传入的id获取数据
    articleDetail.value = res.data.data
    formModel.value = {
      id: articleDetail.value.id,
      title: articleDetail.value.title,
      cate_id: articleDetail.value.cate_id,
      content: articleDetail.value.content,
      cover_img: articleDetail.value.cover_img,
      state: articleDetail.value.state
    }
    imgUrl.value = getFullImageUrl(formModel.value.cover_img)
  } catch (error) {
    console.error('获取文章详情失败', error)
  }
}

const editorRef = ref()
// 组件对外暴漏一个open方法，基于open传来的参数，区分添加还是编辑
const open = (row) => {
  visibilityBinding.value = true
  // editorRef.value.setHTML('')
  // 使用 nextTick 确保 DOM 已渲染
  nextTick(() => {
    editorRef.value.setHTML('')
  })
  // console.log(row.id)
  // id存在，回显，不存在，添加
  if (row.id) {
    // console.log('回显')
    getArticleDetail(row.id)
    // console.log(formModel.value)
    // formModel.value.id = '1001'
  } else {
    formModel.value = {
      title: '',
      cate_id: '',
      content: '',
      cover_img: '', //文章封面，file对象
      state: ''
    }
    imgUrl.value = ''
    // console.log('添加')
  }
}

const emit = defineEmits(['success'])
// 提交
const onAddArticle = async (state) => {
  formModel.value.state = state
  //当前接口需要的是formdata对象，需要将普通JS对象转化成formdata
  const fd = new FormData()
  for (let key in formModel.value) {
    if (key === 'cover_img') {
      // 如果用户上传了新图片，formModel.cover_img 是文件对象
      if (formModel.value.cover_img instanceof File) {
        fd.append(key, formModel.value.cover_img)
      } else if (formModel.value.cover_img) {
        // 如果没有上传新图片，直接将路径字符串传递
        fd.append(key, formModel.value.cover_img)
      } else {
        // 如果封面图片为空（既没有新上传也没有旧图片），报错
        console.error('封面图片不能为空')
        ElMessage.error('封面图片是必填项')
        return
      }
    } else {
      fd.append(key, formModel.value[key])
    }
  }
  // 发送提交请求
  if (formModel.value.id) {
    // console.log('编辑')
    console.log(fd)
    // fd.cover_img = formModel.value.cover_img
    console.log(formModel.value.cover_img)

    await artUpdateArticleService(fd)
    ElMessage.success('编辑成功')
    visibilityBinding.value = false
    emit('success', 'edits')
  } else {
    await artAddArticleService(fd)
    ElMessage.success('添加成功')
    visibilityBinding.value = false
    emit('success', 'add')
  }
}
defineExpose({
  open
})
</script>
<template>
  <!-- 抽屉 -->
  <el-drawer v-model="visibilityBinding" :title="formModel.id ? '编辑文章' : '添加文章'" direction="rtl" size="50%">
    <!-- <span>Hi there!</span> -->

    <!-- 发表文章表单 -->
    <el-form :model="formModel" ref="formRef" label-width="100px">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="formModel.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="文章分类" prop="cate_id">
        <channel-select v-model="formModel.cate_id" width="100%"></channel-select>
      </el-form-item>
      <el-form-item label="文章封面" prop="cover_img">
        <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false" :on-change="onUploadFile">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="文章内容" prop="content">
        <div class="editor">
          <quill-editor
            ref="editorRef"
            theme="snow"
            v-model:content="formModel.content"
            contentType="html"
          ></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onAddArticle('已发布')">发布</el-button>
        <el-button type="info" @click="onAddArticle('草稿')">草稿</el-button>
      </el-form-item>
    </el-form>
  </el-drawer>
</template>
<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }

    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }

    .el-upload:hover {
      border-color: var(--el-color-primary);
    }

    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}

// 富文本编辑器
.editor {
  width: 100%;

  :deep(.ql-editor) {
    min-height: 200px;
  }
}
</style>
