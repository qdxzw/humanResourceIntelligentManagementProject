import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// 创建一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基地址
  timeout: 10000 // 超时时间
})
// 请求拦截器,传入两个参数（回调函数），成功执行第一个，失败执行第二个
service.interceptors.request.use(
  config => {
    // config是配置信息
    // 注入token
    // store.getters.token=>请求头里面
    // 有token，则进行注入(登录成功之后请求其他页面时,要携带token)
    if (store.getters.token) {
      // 根据接口文档，需要将token值放到请求头里面的Authorization,注意格式
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    return config
  },
  error => {
    // 失败执行promise
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  response => {
    // axios默认包裹了data
    const { data, message, success } = response.data
    if (success) {
      return data
    } else {
      Message({
        type: 'error',
        message
      })
      return Promise.reject(new Error(message))
    }
  },
  error => {
    Message({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)
export default service
