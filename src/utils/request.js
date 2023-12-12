import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

// 创建一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基地址
  timeout: 10000 // 超时时间
})
// 请求拦截器,成功执行第一个，失败执行第二个
service.interceptors.request.use(
  config => {
    // 注入token
    // store.getters.token=>请求头里面
    if (store.getters.token) {
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
    const { data, message, sucess } = response.data
    if (sucess) {
      return data
    } else {
      Message({
        type: 'error',
        message: message
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
