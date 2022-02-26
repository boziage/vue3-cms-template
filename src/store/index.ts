import { createStore, Store, useStore as useVuexStore } from 'vuex'

import { IRootState, IStoreType } from './types'

import localCache from '@/utils/cache'

import login from './login/login'
import system from './system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      lang: localCache.getCache('lang') || 'zh'
    }
  },
  getters: {},
  mutations: {
    changeLang(state, lang) {
      state.lang = lang
    }
  },
  actions: {},
  modules: {
    login,
    system
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
