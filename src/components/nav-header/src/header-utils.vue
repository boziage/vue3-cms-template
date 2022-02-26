<template>
  <div class="headerUtils">
    <!-- 全屏 -->
    <screenfull />
    <!-- 国际化 -->
    <el-dropdown trigger="click" @command="handleCommand">
      <svg-icon icon="language" class="icon"></svg-icon>
      <!-- <img class="lang" src="~@/assets/img/globalization.svg" alt="" /> -->
      <template #dropdown>
        <el-dropdown-menu class="translation">
          <el-dropdown-item
            command="zh"
            :style="{
              background: lang === 'zh' ? '#1b2a47' : '',
              color: lang === 'zh' ? '#f4f4f5' : '#000'
            }"
            :disabled="lang === 'zh'"
            ><el-icon v-show="lang === 'zh'"><check /></el-icon>
            简体中文</el-dropdown-item
          >
          <el-dropdown-item
            command="en"
            :style="{
              background: lang === 'en' ? '#1b2a47' : '',
              color: lang === 'en' ? '#f4f4f5' : '#000'
            }"
            :disabled="lang === 'en'"
            ><el-icon v-show="lang === 'en'"><check /></el-icon>
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

import { useI18n } from 'vue-i18n'
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
  align-content: center;
  justify-content: space-evenly;
  font-size: 18px;
}
.icon {
  font-size: 20px;
}
:deep(.el-dropdown) {
  display: flex;
  align-items: center;
}
</style>
