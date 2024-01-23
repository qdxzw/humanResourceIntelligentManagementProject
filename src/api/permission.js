import request from '@/utils/request'

/**
 *
 * 获取权限列表
 *
 */
export function getPermissionList () {
  return request({
    url: '/sys/permission',
    method: 'GET'
  })
}

/**
 *
 * 删除-权限点
 *
 */
export function delPermission (id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * 新增-权限点
 *
 */
export function addPermission (data) {
  return request({
    url: '/sys/permission',
    method: 'POST',
    data
  })
}

/**
 *
 * 获取-权限点详情
 *
 */
export function getPermissionDetail (id) {
  return request({
    url: `/sys/permission/${id}`,
    method: 'GET'
  })
}

/**
 *
 * 修改-权限点详情
 *
 */
export function editPermission (data) {
  return request({
    url: `/sys/permission/${data.id}`,
    method: 'PUT',
    data
  })
}
