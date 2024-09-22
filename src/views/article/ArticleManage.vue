<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artDelArticleService, artGetListService } from '@/api/article'
import { formatTime } from '@/utils/format'

import ArticleEdit from './components/ArticleEdit.vue'

// 文章列表
const articleList = ref([])
const total = ref(0)

const loading = ref(false)
// 请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})
// 获取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()
// 添加
const articleEditRef = ref()
const onAddArticle = () => {
  // console.log(row)
  articleEditRef.value.open({})
  // getArticleList()
}
// 编辑
const onEditArticle = (row) => {
  // console.log(row)
  articleEditRef.value.open(row)
}
// 删除
const onDeleteArticle = async (row) => {
  // console.log(row)
  await artDelArticleService(row.id)
  ElMessage.success('删除成功')
  getArticleList()
}
// 搜索
const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
// 重置
const onReset = () => {
  params.value.cate_id = ''
  params.value.pagenum = 1
  params.value.state = ''
  getArticleList()
}
//处理分页相关
const onSizeChange = (size) => {
  // console.log(size)
  // 只要是每页条数变化了，那么原本的当前页就没什么意义了，重新从第一页渲染即可
  params.value.pagenum = 1
  params.value.pagesize = size

  getArticleList()
}
const onCurrentChange = (page) => {
  // console.log(page)
  // 更新当前页
  params.value.pagenum = page
  getArticleList()
}

// 添加、编辑成功后调用
const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
  }
  getArticleList()
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button @click="onAddArticle" type="primary">添加文章</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id" width="200px"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select v-model="params.state" style="width: 200px">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="articleList" style="width: 100%">
      <el-table-column label="文章标题" width="150">
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="cate_name" label="分类" width="200"></el-table-column>
      <el-table-column prop="pub_date" label="发表时间">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column label="操作 " width="100">
        <template #default="{ row }">
          <el-button :icon="Edit" circle plain @click="onEditArticle(row)" type="primary"></el-button>
          <el-button :icon="Delete" circle plain @click="onDeleteArticle(row)" type="danger"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      style="margin-top: 20px; justify-content: end"
      v-loading="loading"
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />

    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
