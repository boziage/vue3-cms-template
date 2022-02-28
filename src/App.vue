<template>
  <div class="app">
    <el-config-provider :locale="currentLocale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { ElNotification } from 'element-plus'
import { useStore } from '@/store'
const store = useStore()

import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

const currentLocale: any = computed(() => {
  return store.state.lang === 'zh' ? zh : en
})

const showInfo = ref(false)
const show = () => {
  if (showInfo.value) return
  showInfo.value = true
  ElNotification({
    title: '警告',
    type: 'info',
    message: '当前系统分辨率要求至少1280*720，请修改分辨率，否则将会显示不全！',
    duration: 0
  })
}
const close = () => {
  showInfo.value = false
  ElNotification.closeAll()
}

const watchScreen = () => {
  window.screen.width < 1280 || window.screen.height < 720 ? show() : close()
}

onMounted(() => {
  watchScreen()
  window.addEventListener('resize', () => watchScreen())
})
onUnmounted(() => {
  window.addEventListener('resize', () => watchScreen())
})
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
