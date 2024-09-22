<script setup>
import { artGetChannelsService } from '@/api/article'
import { ref } from 'vue'
const selectList = ref([])

defineProps({
  modelValue: {
    type: [Number, String]
  },
  width: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue'])
const getCateList = async () => {
  const res = await artGetChannelsService()
  selectList.value = res.data.data
}
getCateList()
</script>

<template>
  <el-select :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)" :style="{ width }">
    <el-option v-for="item in selectList" :label="item.cate_name" :value="item.id" :key="item.id"></el-option>
  </el-select>
</template>
