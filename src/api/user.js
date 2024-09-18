import request from '@/utils/request'
//注册请求接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
// 登录请求接口
export const userLoginService = ({ username, password }) => request.post('/api/login', { username, password })
