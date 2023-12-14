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
