let BASE_URL = ''
const TIME_OUT = 10000

if (process.env.NODE_ENV === 'development') {
  // 这样webpack上配置的proxy才能映射
  BASE_URL = '/api'
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = '/prod-api'
} else {
  BASE_URL = 'http://demo.org/test'
}

export { BASE_URL, TIME_OUT }
