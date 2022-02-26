import { IRootState, ISystemState } from '@/store/types'
import { Module } from 'vuex'

import { getPageListData } from '@/api/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list: any[]) {
      state.usersList = list
    },
    changeUsersCount(state, count: number) {
      state.usersCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`]
      }
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const pageUrl = payload.pageName

      // const pageUrl = `${pageName}/list`
      // pageUrl.toUpperCase

      // 对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 数据存储到state
      // const { list, totalCount } = pageResult.data

      const changePageName =
        pageUrl.slice(0, 1).toUpperCase() + pageUrl.slice(1)

      commit(`change${changePageName}List`, pageResult.data[pageUrl])
      commit(`change${changePageName}Count`, pageResult.data.total)
    }
  }
}

export default systemModule
