import { ref, onMounted, onUnmounted } from 'vue'
import { ElNotification } from 'element-plus'

import throttle from '@/utils/throttle.js'

export const showNotify = () => {
  const showInfo = ref(false)
  const show = () => {
    if (showInfo.value) return
    showInfo.value = true
    ElNotification({
      title: '警告',
      type: 'info',
      message:
        '当前系统分辨率要求至少1280*720，请修改分辨率，否则将会显示不全！',
      duration: 0
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
