import request from '@/utils/request'

/**
 *
 * 获取组织架构数据
 *
 */
export function getDepartment () {
  return request({
    url: '/company/department',
    method: 'GET'
  })
}

/**
 *
 * 获取部门负责人数据
 */
export function getManagerList () {
  return request({
    url: '/sys/user/simple',
    method: 'GET'
  })
}

/**
 *
 * 新增组织
 */
export function addDepartment (data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}
