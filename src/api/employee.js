import request from '@/utils/request'

/**
 *
 * 获取员工列表
 *
 */
export function getEmployeeList (params) {
  return request({
    url: '/sys/user',
    method: 'GET',
    params // 地址参数 查询参数
  })
}
