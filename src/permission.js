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
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 跳转到主页
      next('/') // 中转到主页
      // next有地址的话并没有执行后置守卫
      nprogress.done()
    } else {
      next() // 放过
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next() // 放过
    } else {
      next('/login') // 中转到登录页
      nprogress.done()
    }
  }
})

/**
 * 后置守卫
 *
 */
router.afterEach(() => {
  console.log(123)
  nprogress.done() // 关闭进度条
})
