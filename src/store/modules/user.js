import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'
import { constantRoutes } from '@/router'
import { resetRouter } from '@/router'
// 存放数据
const state = {
  token: getToken(), // 从缓存中读取初始值
  userInfo: {}, // 存储用户基本资料状态
  routes: constantRoutes // 存储路由信息，默认存储的是静态路由
}
// 修改数据
const mutations = {
  // 两个参数： state 载荷参数
  setToken (state, token) {
    // 只是设置了vuex中的数据
    state.token = token
    // 需要将vuex中的数据同步到缓存
    setToken(token)
  },
  removeToken (state) {
    // 设置了vuex中的token为null
    state.token = null
    // 同步删除缓存中的token
    removeToken(state)
  },
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setRoutes (state, newRoutes) {
    state.routes = [...constantRoutes, ...newRoutes] // 静态路由+动态路由
  }
}
// 异步操作
const actions = {
  // context上下文（commit和dispatch的方法），传入参数
  async login (context, data) {
    // console.log(data)
    // 调用登录接口
    const token = await login(data)
    // 返回一个token
    context.commit('setToken', token)
  },
  // 获取用户的基本资料
  async getUserInfo (context) {
    const result = await getUserInfo()
    context.commit('setUserInfo', result)
    return result // 返回数据
  },
  // 退出登录
  logout (context) {
    // 1.删除token
    context.commit('removeToken')
    // 2.删除用户信息
    context.commit('setUserInfo', {})
    // 重置路由
    resetRouter()
  }
}
export default {
  namespaced: true, // 开启命名空间（调用模块内容时，要带上模块名称）
  state,
  mutations,
  actions
}
