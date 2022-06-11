import BORequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
import { useStore } from '@/store'

import { diffTokenTime } from '@/utils/auth'

import { useMessage } from '@/hooks/use-message'
const { showMessage } = useMessage()

const boRequest = new BORequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token拦截
      const token = localCache.getCache('token')
      if (token) {
        if (diffTokenTime()) {
          const store = useStore()
          store.dispatch('login/logoutAction')
        }
        config.headers.Authorization = token
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      const { meta } = res.data
      if (!meta) return res.data
      if (boRequest.showMessage) showMessage(meta)
      if (meta.status === 200 || meta.status === 201) return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default boRequest
