import request from '@/utils/request'
// 按需导出
export function login (data) {
  // request执行之后会得到promise对象(再通过使用async和await可以获取结果)
  return request({
    url: '/sys/login',
    method: 'post',
    data // body参数位于data
  })
}
// 获取-用户基本资料
export function getUserInfo () {
  // request执行之后会得到promise对象(再通过使用async和await可以获取结果)
  return request({
    url: '/sys/profile',
    method: 'GET'
  })
}

/**
 * 更新密码
 */
export function updatePassword (data) {
  return request({
    url: '/sys/user/updatePass',
    method: 'PUT',
    data
  })
}
