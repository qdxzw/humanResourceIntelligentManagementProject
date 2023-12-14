/**
 * 主页权限验证
 *
 *  */
import router from '@/router'
import nprogress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import store from '@/store'
/**
 * 前置守卫
 *
 */
// 白名单
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
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
      next()
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
