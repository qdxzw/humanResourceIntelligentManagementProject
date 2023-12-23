import request from '@/utils/request'

/**
 *
 * 获取-分页查询角色列表
 *
 */
export function getRoleList (params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params // 查询参数,会拼接到url地址上
  })
}
