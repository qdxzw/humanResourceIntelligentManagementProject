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

/**
 *
 * 首页-消息通知
 *
 */
export function getMessageList () {
  return request({
    url: '/home/notice',
    method: 'GET'
  })
}
