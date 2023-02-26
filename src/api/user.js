import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 获取用户资料
export function getInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post',
  })
}

// 获取用户头像
export function getUserDetail(id) {
  return request({
    url: `/sys/user/${id}`,
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

