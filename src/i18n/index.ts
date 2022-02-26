import { createI18n } from 'vue-i18n/index.js'
import EN from './en'
import ZH from './zh'

import localCache from '@/utils/cache'
const messages = {
  en: {
    ...EN
  },
  zh: {
    ...ZH
  }
}

const getCurrentLanguage = () => {
  const UAlang = navigator.language // zh-CN
  let langCode
  if (localCache.getCache('lang')) {
    langCode = localCache.getCache('lang')
  } else {
    langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en'
  }

  localCache.setCache('lang', langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getCurrentLanguage() || 'zh',
  messages: messages
})

export default i18n
