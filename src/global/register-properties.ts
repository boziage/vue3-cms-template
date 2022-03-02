import { App } from 'vue'

import {
  formatUtcString,
  formatTimestamp,
  formatTimeSecond
} from '@/utils/date-format'

export default function (app: App) {
  app.config.globalProperties.$filters = {
    foo() {
      console.log('foo')
    },
    formatTime(value: string) {
      return formatUtcString(value)
    },
    formatTimeSecond(value: string) {
      const val = parseInt(value) * 1000
      return formatTimeSecond(val)
    },
    formatTimeStamp(value: string) {
      return formatTimestamp(value)
    }
  }
}
