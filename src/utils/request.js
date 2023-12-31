import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

// 创建一个新的axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基地址
  timeout: 500000 // 超时时间
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
    // 判断是不是Blob
    if (response.data instanceof Blob) return response.data // 返回了Blob对象
    const { data, message, success } = response.data // 默认json格式
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
  async error => {
    // 判断token值是否等于401
    if (error.response.status === 401) {
      Message({ type: 'warning', message: '登录超时了' })
      // token超时了
      await store.dispatch('user/logout') // 退出登录action
      router.push('/login') // 跳到登录页
      return Promise.reject(error)
    }
    Message({
      type: 'error',
      message: error.message
    })
    return Promise.reject(error)
  }
)
export default service
