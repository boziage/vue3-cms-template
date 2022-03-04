import { ref, onMounted, onUnmounted } from 'vue'
import { ElNotification } from 'element-plus'

import i18n from '@/i18n'
const t = i18n.global.t

import throttle from '@/utils/throttle.js'

export const showNotify = (type: any = 'info') => {
  const showInfo = ref(false)
  const show = () => {
    if (showInfo.value) return
    showInfo.value = true
    ElNotification({
      title: t('dialog.screenTitle'),
      message: t('dialog.screenInfo'),
      duration: 0,
      type
    })
  }
  const close = () => {
    showInfo.value = false
    ElNotification.closeAll()
  }

  const watchScreen = throttle(
    () => {
      document.body.clientWidth < 1280 || document.body.clientHeight < 720
        ? show()
        : close()
    },
    200,
    {
      leading: true,
      trailing: true
    }
  )

  onMounted(() => {
    watchScreen()
    window.addEventListener('resize', () => watchScreen())
  })
  onUnmounted(() => {
    window.addEventListener('resize', () => watchScreen())
  })
}
