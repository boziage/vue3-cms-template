import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { BoRequestConfig, BoRequestInterceptors } from './types'
import { ElLoading } from 'element-plus'

import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = false

class BORequest {
  instance: AxiosInstance
  interceptors?: BoRequestInterceptors
  showLoading?: boolean
  loading?: LoadingInstance

  constructor(config: BoRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING

    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use(
      (config) => {
        // 添加loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        this.loading?.close()

        // const data = res.data
        // if (data.returnCode === '-1001') {
        //   console.log('请求失败,错误信息')
        // } else {
        //   return data
        // }
        return res
      },
      (err) => {
        // 判断不同HttpErrorCode显示不同的错误
        // if (err.response.status === 404) {
        //   console.log('error 404')
        // }
        return err
      }
    )
  }

  request<T = any>(config: BoRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // console.log(res)

          // 将showLoading复原,这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          // return err
        })
    })
  }

  get<T = any>(config: BoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: BoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: BoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: BoRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default BORequest
