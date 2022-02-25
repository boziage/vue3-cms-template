import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'
import localCache from './cache'

// 登录时设置时间
export const setTokenTime = () => {
  localCache.setCache(TOKEN_TIME, Date.now())
}

// 获取
export const getTokenTime = () => {
  return localCache.getCache(TOKEN_TIME)
}

// 是否过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime = getTokenTime()
  return currentTime - tokenTime >= TOKEN_TIME_VALUE
}
