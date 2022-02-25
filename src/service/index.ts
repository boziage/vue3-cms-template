import BORequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
import { useStore } from '@/store'

import { diffTokenTime } from '@/utils/auth'

import { useMessage } from '@/utils/use-message'
const { showMessage } = useMessage()

const store = useStore()

const boRequest = new BORequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token拦截
      const token = localCache.getCache('token')
      if (token) {
        if (diffTokenTime()) {
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
      showMessage(meta)
      if (meta.status === 200 || meta.status === 201) {
        return res.data
      }
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default boRequest
