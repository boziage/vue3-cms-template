import { Module } from 'vuex'
import router from '@/router'

import localCache from '@/utils/cache'
import { setTokenTime } from '@/utils/auth'
import { TOKEN_TIME } from '@/utils/constant'

import type { ILoginState, IRootState } from '../types'
import { loginRequest } from '@/api/login/login'
import { ElMessage } from 'element-plus'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: localCache.getCache('token') || '',
      userMenus: [
        {
          id: 38,
          name: 'analysis',
          type: 1,
          url: '/main/analysis',
          icon: 'Monitor',
          sort: 1,
          createAt: '2021-04-19T14:11:02.000Z',
          updateAt: '2021-08-20T06:59:55.000Z',
          children: [
            {
              id: 39,
              url: '/main/analysis/overview',
              name: 'overview',
              sort: 106,
              type: 2,
              children: null,
              createAt: '2021-01-02 18:09:11.000000',
              parentId: 38,
              updateAt: '2021-08-19 15:54:41.000000'
            },
            {
              id: 40,
              url: '/main/analysis/dashboard',
              name: 'dashboard',
              sort: 107,
              type: 2,
              children: null,
              createAt: '2021-01-02 18:09:22.000000',
              parentId: 38,
              updateAt: '2021-08-19 15:56:08.000000'
            }
          ]
        },
        {
          id: 1,
          name: 'system',
          type: 1,
          url: '/main/system',
          icon: 'Setting',
          sort: 2,
          createAt: '2021-01-02T10:08:14.000Z',
          updateAt: '2021-08-20T07:00:08.000Z',
          children: [
            {
              id: 2,
              url: '/main/system/user',
              name: 'user',
              sort: 100,
              type: 2,
              children: [
                {
                  id: 5,
                  url: null,
                  name: '创建用户',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 2,
                  updateAt: '2021-08-19 16:10:06.000000',
                  permission: 'system:users:create'
                },
                {
                  id: 6,
                  url: null,
                  name: '删除用户',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 2,
                  updateAt: '2021-08-19 16:10:21.000000',
                  permission: 'system:users:delete'
                },
                {
                  id: 7,
                  url: null,
                  name: '修改用户',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 2,
                  updateAt: '2021-08-19 16:10:24.000000',
                  permission: 'system:users:update'
                },
                {
                  id: 8,
                  url: null,
                  name: '查询用户',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 2,
                  updateAt: '2021-08-19 16:10:26.000000',
                  permission: 'system:users:query'
                }
              ],
              createAt: '2021-01-02 18:08:47.000000',
              parentId: 1,
              updateAt: '2021-08-19 15:52:01.000000'
            },
            {
              id: 3,
              url: '/main/system/department',
              name: 'department',
              sort: 101,
              type: 2,
              children: [
                {
                  id: 17,
                  url: null,
                  name: '创建部门',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 3,
                  updateAt: '2021-04-19 21:59:39.000000',
                  permission: 'system:department:create'
                },
                {
                  id: 18,
                  url: null,
                  name: '删除部门',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 3,
                  updateAt: '2021-04-19 22:05:07.000000',
                  permission: 'system:department:delete'
                },
                {
                  id: 19,
                  url: null,
                  name: '修改部门',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 3,
                  updateAt: '2021-04-19 22:05:11.000000',
                  permission: 'system:department:update'
                },
                {
                  id: 20,
                  url: null,
                  name: '查询部门',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 3,
                  updateAt: '2021-04-19 22:05:14.000000',
                  permission: 'system:department:query'
                }
              ],
              createAt: '2021-01-02 18:09:11.000000',
              parentId: 1,
              updateAt: '2021-08-19 15:52:04.000000'
            },
            {
              id: 4,
              url: '/main/system/menu',
              name: 'menu',
              sort: 103,
              type: 2,
              children: [
                {
                  id: 21,
                  url: null,
                  name: '创建菜单',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 4,
                  updateAt: '2021-04-19 21:59:39.000000',
                  permission: 'system:menu:create'
                },
                {
                  id: 22,
                  url: null,
                  name: '删除菜单',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 4,
                  updateAt: '2021-04-19 22:05:18.000000',
                  permission: 'system:menu:delete'
                },
                {
                  id: 23,
                  url: null,
                  name: '修改菜单',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 4,
                  updateAt: '2021-04-19 22:05:21.000000',
                  permission: 'system:menu:update'
                },
                {
                  id: 24,
                  url: null,
                  name: '查询菜单',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 4,
                  updateAt: '2021-04-19 22:05:24.000000',
                  permission: 'system:menu:query'
                }
              ],
              createAt: '2021-01-02 18:09:22.000000',
              parentId: 1,
              updateAt: '2021-08-19 15:52:07.000000'
            },
            {
              id: 25,
              url: '/main/system/role',
              name: 'role',
              sort: 102,
              type: 2,
              children: [
                {
                  id: 26,
                  url: null,
                  name: '创建角色',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 25,
                  updateAt: '2021-04-19 21:59:39.000000',
                  permission: 'system:role:create'
                },
                {
                  id: 27,
                  url: null,
                  name: '删除角色',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 25,
                  updateAt: '2021-04-19 21:59:44.000000',
                  permission: 'system:role:delete'
                },
                {
                  id: 28,
                  url: null,
                  name: '修改角色',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 25,
                  updateAt: '2021-04-19 21:59:47.000000',
                  permission: 'system:role:update'
                },
                {
                  id: 29,
                  url: null,
                  name: '查询角色',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 25,
                  updateAt: '2021-04-19 21:59:49.000000',
                  permission: 'system:role:query'
                }
              ],
              createAt: '2021-01-02 18:09:22.000000',
              parentId: 1,
              updateAt: '2021-08-19 15:52:17.000000'
            }
          ]
        },
        {
          id: 9,
          name: 'product',
          type: 1,
          url: '/main/product',
          icon: 'Goods',
          sort: 3,
          createAt: '2021-01-05T12:15:56.000Z',
          updateAt: '2021-08-20T07:00:25.000Z',
          children: [
            {
              id: 15,
              url: '/main/product/category',
              name: 'category',
              sort: 104,
              type: 2,
              children: [
                {
                  id: 30,
                  url: null,
                  name: '创建类别',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 15,
                  updateAt: '2021-04-19 21:59:39.000000',
                  permission: 'system:category:create'
                },
                {
                  id: 31,
                  url: null,
                  name: '删除类别',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 15,
                  updateAt: '2021-04-19 21:59:44.000000',
                  permission: 'system:category:delete'
                },
                {
                  id: 32,
                  url: null,
                  name: '修改类别',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 15,
                  updateAt: '2021-04-19 21:59:47.000000',
                  permission: 'system:category:update'
                },
                {
                  id: 33,
                  url: null,
                  name: '查询类别',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 15,
                  updateAt: '2021-04-19 21:59:49.000000',
                  permission: 'system:category:query'
                }
              ],
              createAt: '2021-04-19 21:55:11.000000',
              parentId: 9,
              updateAt: '2021-08-19 15:52:12.000000'
            },
            {
              id: 16,
              url: '/main/product/goods',
              name: 'goods',
              sort: 105,
              type: 2,
              children: [
                {
                  id: 34,
                  url: null,
                  name: '创建商品',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 16,
                  updateAt: '2021-08-19 17:29:46.000000',
                  permission: 'system:goods:create'
                },
                {
                  id: 35,
                  url: null,
                  name: '删除商品',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 16,
                  updateAt: '2021-08-19 17:29:50.000000',
                  permission: 'system:goods:delete'
                },
                {
                  id: 36,
                  url: null,
                  name: '修改商品',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 16,
                  updateAt: '2021-08-19 17:29:53.000000',
                  permission: 'system:goods:update'
                },
                {
                  id: 37,
                  url: null,
                  name: '查询商品',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 16,
                  updateAt: '2021-08-19 17:30:02.000000',
                  permission: 'system:goods:query'
                }
              ],
              createAt: '2021-04-19 21:57:33.000000',
              parentId: 9,
              updateAt: '2021-08-19 15:52:14.000000'
            }
            // {
            //   id: 426,
            //   url: '/product/goods',
            //   name: '商品信息',
            //   sort: 104,
            //   type: 2,
            //   children: null,
            //   createAt: '2022-02-21 16:32:36.000000',
            //   parentId: 9,
            //   updateAt: '2022-02-21 16:32:36.000000'
            // }
          ]
        },
        {
          id: 41,
          name: 'story',
          type: 1,
          url: '/main/story',
          icon: 'ChatLineRound',
          sort: 4,
          createAt: '2021-04-19T14:11:02.000Z',
          updateAt: '2021-08-20T07:00:44.000Z',
          children: [
            {
              id: 42,
              url: '/main/story/chat',
              name: 'chat',
              sort: 108,
              type: 2,
              children: null,
              createAt: '2021-01-02 18:09:11.000000',
              parentId: 41,
              updateAt: '2021-08-19 17:29:31.000000'
            },
            {
              id: 43,
              url: '/main/story/list',
              name: 'list',
              sort: 109,
              type: 2,
              children: [
                {
                  id: 10,
                  url: null,
                  name: '删除故事',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 43,
                  updateAt: '2021-04-19 21:59:44.000000',
                  permission: 'system:story:delete'
                },
                {
                  id: 11,
                  url: null,
                  name: '修改故事',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 43,
                  updateAt: '2021-04-19 21:59:47.000000',
                  permission: 'system:story:update'
                },
                {
                  id: 12,
                  url: null,
                  name: '查询故事',
                  sort: null,
                  type: 3,
                  createAt: '2021-01-03 13:41:01.000000',
                  parentId: 43,
                  updateAt: '2021-04-19 21:59:49.000000',
                  permission: 'system:story:query'
                }
              ],
              createAt: '2021-01-02 18:09:11.000000',
              parentId: 41,
              updateAt: '2021-08-19 15:52:29.000000'
            }
          ]
        }
      ]
    }
  },
  getters: {},
  mutations: {
    changeToken(state, token) {
      state.token = token
      localCache.setCache('token', token)
    }
  },
  actions: {
    async loginAction({ commit }, payload) {
      const res = await loginRequest(payload)
      setTokenTime()
      commit('changeToken', res.data.token)
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
    }
  }
}

export default loginModule
