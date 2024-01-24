import request from '@/utils/request'

/**
 *
 * 首页-展示接口
 *
 */
export function getHomeData () {
  return request({
    url: '/home/data',
    method: 'GET'
  })
}
