import request from '@/utils/request'
//注册请求接口
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}
// 登录请求接口
export const userLoginService = ({ username, password }) => request.post('/api/login', { username, password })

// 获取用户基本信息
export const userInfoServiec = () => request.get('/my/userinfo')

// 修改用户信息
export const editUserInfoService = ({ id, nickname, email }) => request.put('/my/userinfo', { id, nickname, email })
// 修改用户头像
export const editUserAvatarService = ({ avatar }) => request.patch('/my/update/avatar', { avatar })

// 重置密码
export const resetPasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
