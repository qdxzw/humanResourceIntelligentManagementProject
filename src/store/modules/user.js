import { getToken, setToken, removeToken } from '@/utils/auth'
const state = {
  token: getToken() // 从缓存中读取初始值
}
const mutations = {
  setToken (state, token) {
    state.token = token
    // 同步到缓存
    setToken(token)
  },
  removeToken () {
    // 删除Vuex的token
    state.token = null
    removeToken()
  }
}
const actions = {
  // context上下文,传入参数
  login (context, data) {
    console.log(data)
    // 调用登录接口
    // 放回一个token 123456
    context.commit('setToken', '123456')
  }
}
export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
