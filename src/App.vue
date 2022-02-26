<template>
  <div class="app">
    <el-config-provider :locale="currentLocale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import localCache from '@/utils/cache'

import zh from 'element-plus/lib/locale/lang/zh-cn'
import en from 'element-plus/lib/locale/lang/en'

const currentLocale = computed(() => {
  return localCache.getCache('lang') === 'zh' ? zh : en
})
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}
</style>
