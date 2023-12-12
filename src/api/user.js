import request from '@/utils/request'
export function login (data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data // body参数位于data
  })
}
