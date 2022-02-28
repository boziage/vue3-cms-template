<template>
  <div class="headerUtils">
    <!-- 引导页 -->
    <driver class="icon" />
    <!-- 全屏 -->
    <screenfull />
    <!-- 国际化 -->
    <el-dropdown trigger="click" @command="handleCommand" id="language">
      <svg-icon icon="language" class="icon"></svg-icon>
      <template #dropdown>
        <el-dropdown-menu class="translation">
          <el-dropdown-item command="zh" :disabled="lang === 'zh'"
            ><el-icon v-if="lang === 'zh'"><check /></el-icon>
            <div v-else style="min-width: 19px" />
            简体中文</el-dropdown-item
          >
          <el-dropdown-item command="en" :disabled="lang === 'en'"
            ><el-icon v-if="lang === 'en'"><check /></el-icon>
            <div v-else style="min-width: 19px" />
            English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import localCache from '@/utils/cache'

import { useStore } from '@/store'
const store = useStore()

import { useI18n } from 'vue-i18n/index.js'
const i18n = useI18n()

const lang = computed(() => {
  return i18n.locale.value
})

const handleCommand = (val: string) => {
  i18n.locale.value = val
  store.commit('changeLang', val)
  localCache.setCache('lang', val)
}
</script>

<style lang="scss" scoped>
.headerUtils {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 18px;
}
.icon {
  font-size: 19px;
}
:deep(.el-dropdown) {
  display: flex;
  align-items: center;
}
</style>
