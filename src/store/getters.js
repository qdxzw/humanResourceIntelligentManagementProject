const getters = {
  sidebar: state => state.app.sidebar, // 取app模块属性
  device: state => state.app.device,
  token: state => state.user.token, // 取user模块属性
  userId: state => state.user.userInfo.userId, // 取用户id，用于判断页面是否获取过资料
  avatar: state => state.user.userInfo.staffPhoto, // 用户头像
  name: state => state.user.userInfo.username, // 用户姓名
  routes: state => state.user.routes
}
// getters编辑访问
export default getters
