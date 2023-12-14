import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'
// 存放数据
const state = {
  token: getToken() // 从缓存中读取初始值
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
    removeToken()
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
  }
}
export default {
  namespaced: true, // 开启命名空间（调用模块内容时，要带上模块名称）
  state,
  mutations,
  actions
}
