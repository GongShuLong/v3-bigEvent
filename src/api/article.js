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

// 获取文章详情
export const artGetDetailService = (id) =>
  request.get('/my/article/info', {
    params: {
      id
    }
  })
// 新增文章
export const artAddArticleService = (data) => request.post('/my/article/add', data)

// 更新文章
export const artUpdateArticleService = (data) => request.put('/my/article/info', data)
// 删除文章
export const artDelArticleService = (id) =>
  request.delete('/my/article/info', {
    params: {
      id
    }
  })
