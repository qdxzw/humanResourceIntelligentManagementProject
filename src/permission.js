/**
 * 主页权限验证
 *
 *  */
import router from '@/router'
import nprogress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import store from '@/store'
import { asyncRoutes } from '@/router'
/**
 * 前置守卫
 *
 */
// 白名单
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  nprogress.start() // 开启进度条
  // 判断是否有token
  if (store.getters.token) {
    // 如果有token,则判断是否是登录页
    if (to.path === '/login') {
      // 如果是则跳转到主页
      next('/')
      // next有地址的话并没有执行后置守卫,所以要手动调用一下进度条关闭
      nprogress.done()
    } else {
      // 如果不是则放过
      // 判断是否获取过资料
      if (!store.getters.userId) {
        // 如果没有则获取资料
        const { roles } = await store.dispatch('user/getUserInfo')
        const filterRoutes = asyncRoutes.filter(item => {
          return roles.menus.includes(item.name)
        }) // 筛选后的路由
        store.commit('user/setRoutes', filterRoutes)
        router.addRoutes([
          ...filterRoutes,
          { path: '*', redirect: '/404', hidden: true }
        ]) // 添加动态路由信息到路由表
        // router添加动态路由之后 需要转发一下
        next(to.path) // 目的是让路由拥有信息 router的已知缺陷
      } else {
        next() // 放过
      }
    }
  } else {
    // 判断是否在白名单里面
    if (whiteList.includes(to.path)) {
      // 如果在就放过
      next()
    } else {
      // 如果不在,就跳转到登录
      next('/login')
      nprogress.done()
    }
  }
})

/**
 * 后置守卫
 *
 */
router.afterEach(() => {
  nprogress.done() // 关闭进度条
})
