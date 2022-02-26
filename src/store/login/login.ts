import { Module } from 'vuex'
import router from '@/router'

import localCache from '@/utils/cache'
import { setTokenTime } from '@/utils/auth'
import { TOKEN_TIME } from '@/utils/constant'

import type { ILoginState, IRootState } from '../types'
import { loginRequest } from '@/api/login/login'
import { ElMessage } from 'element-plus'

import userMenu from './mock.js'

import { mapMenusToPermissions } from '@/hooks/map-menus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: localCache.getCache('token') || '',
      userMenus: [],
      permissions: [],
      userInfo: []
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      // 获取用户按钮的权限
      const permissions = mapMenusToPermissions(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      const res = await loginRequest(payload)

      // token
      setTokenTime()
      commit('changeToken', res.data.token)
      localCache.setCache('token', res.data.token)

      // mock userMenus
      const userMenus = userMenu
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // router
      router.replace('/')
    },

    logoutAction(ctx, payload) {
      localCache.deleteCache('token')
      localCache.deleteCache(TOKEN_TIME)
      localCache.deleteCache('userInfo')
      localCache.deleteCache('userMenus')
      localCache.deleteCache('history')
      localCache.deleteCache('historyCount')
      if (!localCache.getCache('name') || !localCache.getCache('password')) {
        localCache.deleteCache('name')
        localCache.deleteCache('password')
      }
      router.replace('/login')

      if (payload) {
        ElMessage('token已过期,请重新登录')
        return Promise.reject(new Error('token 失效了'))
      }
    },

    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化的请求(完整role/department)(这里为了传到根,要这么写)
        // dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
