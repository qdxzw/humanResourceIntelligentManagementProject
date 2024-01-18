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

/**
 *
 * 导出员工的excel
 *
 */
export function exportEmployee () {
  return request({
    url: '/sys/user/export',
    method: 'GET',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}

/**
 *
 * 下载导入员工模板
 *
 */
export function getExportTemplate () {
  return request({
    url: '/sys/user/import/template',
    method: 'GET',
    // 改变接收数据的类型
    responseType: 'blob' // 使用blob接收二进制文件流
  })
}

/**
 *
 * 导入员工(上传excel)
 *
 */
export function uploadExcel (data) {
  return request({
    url: '/sys/user/import',
    method: 'POST',
    data // form-data类型 因为要上传文件类型
  })
}

/**
 *
 * 删除员工
 *
 */
export function delEmployee (id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'DELETE'
  })
}

/**
 *
 * 增加员工
 *
 */
export function addEmployee (data) {
  return request({
    url: '/sys/user',
    method: 'POST',
    data
  })
}

/**
 *
 * 获取-员工-基本信息
 *
 */
export function getEmployeeDetail (id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

/**
 *
 * 修改-员工-基本信息
 *
 */
export function updateEmployee (data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
