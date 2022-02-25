import router from './index'
import localCache from '@/utils/cache'

import { diffTokenTime } from '@/utils/auth'
import store from '@/store'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  if (localCache.getCache('token')) {
    if (to.path === '/login') {
      next('/')
    } else {
      if (diffTokenTime()) {
        store.dispatch('login/logoutAction', true)
        return
      }
      if (to.path === '/main') {
        const firstUrl = store.state.login!.userMenus[0]?.children[0].url
        next(firstUrl)
        return
      }
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
