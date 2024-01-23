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

/**
 *
 * 新增-角色
 *
 */
export function addRole (data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

/**
 *
 * 修改-角色
 *
 */
export function updateRole (data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'PUT',
    data
  })
}

/**
 *
 * 删除-角色
 *
 */
export function deleteRole (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * 获取-角色详情
 *
 */
export function getRoleDetail (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'GET'
  })
}

/**
 *
 * 分配权限-角色
 *
 */
export function assignPrem (data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data
  })
}
