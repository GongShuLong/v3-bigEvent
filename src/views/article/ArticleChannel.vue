<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'

import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const channelsList = ref([])
const loading = ref(true)
const dialog = ref()

const getChannelsList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  // console.log(res)
  loading.value = false
  channelsList.value = res.data.data
  // channelsList.value = []
}
getChannelsList()

const onEditChannel = (row) => {
  dialog.value.open(row)
}
const onDelChannel = () => {
  // dialog.value.open()
}
const onAddChannel = () => {
  dialog.value.open({})
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="channelsList" style="width: 100%">
      <el-table-column width="80" type="index" prop="" label="序号"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column width="120" prop="" label="操作">
        <template #default="{ row, $index }">
          <el-button plain circle type="primary" :icon="Edit" @click="onEditChannel(row, $index)"> </el-button>
          <el-button plain circle type="danger" :icon="Delete" @click="onDelChannel(row, $index)"> </el-button>
        </template>
      </el-table-column>

      <template #empty>
        <el-empty description="空空如也"></el-empty>
      </template>
    </el-table>
    <channel-edit ref="dialog"></channel-edit>
  </page-container>
</template>
<style lang="scss" scoped></style>
