import axios from 'axios'
import { useUserStore } from '@/stores'

import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL: baseURL,
  timeout: 10000
})
//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const userStore = useUserStore
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    if (res.data.status === 0) return res

    // TODO 3. 处理业务失败
    ElMessage.error(res.data.message || '服务器繁忙')
  },
  (err) => {
    // TODO 5. 处理401错误
    // 401错误是未登录或者登录状态过期
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 其他错误
    ElMessage.error(err.response.message || '服务器繁忙')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
