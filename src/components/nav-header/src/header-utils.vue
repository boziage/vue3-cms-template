<template>
  <div class="headerUtils">
    <!-- 全屏 -->
    <!-- <screenfull v-show="!deviceDetection()" /> -->
    <!-- 国际化 -->
    <el-dropdown trigger="click">
      <img class="locale" src="~@/assets/img/globalization.svg" alt="" />
      <template #dropdown>
        <el-dropdown-menu class="translation">
          <el-dropdown-item
            :style="{
              background: locale === 'zh' ? '#1b2a47' : '',
              color: locale === 'zh' ? '#f4f4f5' : '#000'
            }"
            @click="translationCh"
            ><el-icon v-show="locale === 'zh'"><check /></el-icon>
            简体中文</el-dropdown-item
          >
          <el-dropdown-item
            :style="{
              background: locale === 'en' ? '#1b2a47' : '',
              color: locale === 'en' ? '#f4f4f5' : '#000'
            }"
            @click="translationEn"
            ><el-icon v-show="locale === 'en'"><check /></el-icon>
            English</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { useStore } from '@/store'
import localCache from '@/utils/cache'
export default defineComponent({
  setup() {
    const store = useStore()

    const locale = ref('zh')

    // 初始化数据
    if (localCache.getCache('locale')) {
      locale.value = localCache.getCache('locale')
      // store.commit('changeLocale', locale.value)
    } else {
      localCache.setCache('locale', 'zh')
      // store.commit('changeLocale', 'zh')
    }

    // 简体中文
    const translationCh = () => {
      locale.value = 'zh'
      localCache.setCache('locale', 'zh')
      // store.commit('changeLocale', locale.value)
    }

    // English
    const translationEn = () => {
      locale.value = 'en'
      localCache.setCache('locale', 'en')
      // store.commit('changeLocale', locale.value)
    }
    return {
      translationCh,
      translationEn,
      locale
    }
  }
})
</script>

<style lang="scss" scoped>
.locale {
  width: 20px;
}

.navbar {
  width: 100%;
  height: 48px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 48px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .vertical-header-right {
    display: flex;
    min-width: 280px;
    height: 48px;
    align-items: center;
    color: #000000d9;
    justify-content: flex-end;

    :deep(.dropdown-badge) {
      &:hover {
        background: #f6f6f6;
      }
    }

    .screen-full {
      cursor: pointer;

      &:hover {
        background: #f6f6f6;
      }
    }

    .globalization {
      height: 48px;
      width: 40px;
      padding: 11px;
      cursor: pointer;

      &:hover {
        background: #f6f6f6;
      }
    }

    .el-dropdown-link {
      width: 100px;
      height: 48px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      color: #000000d9;

      &:hover {
        background: #f6f6f6;
      }

      p {
        font-size: 14px;
      }

      img {
        width: 22px;
        height: 22px;
        border-radius: 50%;
      }
    }

    .el-icon-setting {
      height: 48px;
      width: 38px;
      padding: 12px;
      display: flex;
      cursor: pointer;
      align-items: center;

      &:hover {
        background: #f6f6f6;
      }
    }
  }

  .breadcrumb-container {
    float: left;
  }
}

.translation {
  .el-dropdown-menu__item {
    padding: 0 40px !important;
  }

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #606266;
    background: #f0f0f0;
  }

  .check-zh {
    position: absolute;
    left: 20px;
    top: 13px;
  }

  .check-en {
    position: absolute;
    bottom: 13px;
    left: 20px;
  }
}

.logout {
  .el-dropdown-menu__item {
    display: inline-flex;
    padding: 0 18px !important;
  }

  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    color: #606266;
    background: #f0f0f0;
  }
}
</style>
