import axios from 'axios'
import { ElLoading } from 'element-plus'

const DEFAULT_LOADING = false
const DEFAULT_MESSAGE = true

/**
 *  instance: AxiosInstance
    interceptors?: BoRequestInterceptors
    showLoading?: boolean
    showMessage?: boolean
    loading?: LoadingInstance
 */
class BORequest {
  constructor(config) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.showMessage = config.showMessage ?? DEFAULT_MESSAGE

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

        const data = res.data
        // if (data.returnCode === '-1001') {
        //   console.log('请求失败,错误信息')
        // } else {
        //   return data
        // }
        return data
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

  request(config) {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      if (config.showLoading !== undefined)
        this.showLoading = config.showLoading
      if (config.showMessage !== undefined)
        this.showMessage = config.showMessage

      this.instance
        .request(config)
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

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }

  delete(config) {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch(config) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

export default BORequest
