import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface BoRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}
export interface BoRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: BoRequestInterceptors<T>
  showLoading?: boolean
  showMessage?: boolean
}
