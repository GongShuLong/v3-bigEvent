import request from '@/utils/request'

// 获取文章分类列表
export const artGetChannelsService = () => request.get('/my/cate/list')

// 新增文分类
export const artAddChannelService = (obj) => request.post('/my/cate/add', obj)

//编辑
export const artEditChannelService = (obj) => request.put('/my/cate/info', obj)

// 删除
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章管理

// 获取文章列表
export const artGetListService = (params) => request.get('/my/article/list', { params })
