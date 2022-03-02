import { IRootState, ISystemState } from '@/store/types'
import { Module } from 'vuex'

import {
  getPageListData,
  changeState,
  createPageData,
  editPageData,
  deletePageData
} from '@/api/main/system/system'

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
    },

    async changeStateAction({ dispatch }, payload: any) {
      const { pageName, row } = payload
      const pageUrl = `/${pageName}/${row.id}/state/${!row.mg_state}`

      // 调用网络请求
      const res = await changeState(pageUrl)
      console.log(res)

      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          pagenum: 1,
          pagesize: 10
        }
      })
    },

    async createPagaDataAction({ dispatch }, payload: any) {
      // 新建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      const res = await createPageData(pageUrl, newData)
      // showMessage(res)

      // 请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          pagenum: 1,
          pagesize: 10
        }
      })
    },

    async editPagaDataAction({ dispatch }, payload: any) {
      // 编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      const res = await editPageData(pageUrl, editData)

      // 请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          pagenum: 1,
          pagesize: 10
        }
      })
    },

    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.pageName: -> /users
      // 2.:id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 调用网络请求
      const res = await deletePageData(pageUrl)

      // 重新请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          pagenum: 1,
          pagesize: 10
        }
      })
    }
  }
}

export default systemModule
