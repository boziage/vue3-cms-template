import { App } from 'vue'

import { formatUtcString, formatTimestamp } from '@/utils/date-format'

export default function (app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    },
    formatTimeStamp(value: string) {
      return formatTimestamp(value)
    }
  }
}
