<template>
  <div class="nav-history">
    <div class="tags">
      <p
        v-for="(tag, index) in tags"
        :key="index"
        :class="index === currentIndex ? 'current' : ''"
        @click="handleChangeRoute(tag.path)"
      >
        {{ tag.name }}
        <i
          v-if="index !== 0"
          class="el-icon-close"
          @click.prevent.stop="handleClose(index, tag.path)"
        />
      </p>
    </div>
    <div class="dropdown">
      <el-dropdown v-if="tags.length > 1" placement="bottom-end">
        <span class="el-icon-arrow-down el-icon--right" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleCloseOther"
              >关闭其他标签</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from 'vue'
import { useStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import localCache from '@/utils/cache'

export default defineComponent({
  setup() {
    // 当前页被关闭
    const isCurrentClose = ref(false)
    const currentIndex = ref(0)
    const tags: any = ref([
      {
        name: '首页',
        path: '/main/analysis/overview'
      }
    ])

    // 初始化数据
    if (localCache.getCache('history')) {
      tags.value = localCache.getCache('history')
      currentIndex.value = localCache.getCache('historyCount')
    } else {
      localCache.setCache('history', tags.value)
      localCache.setCache('historyCount', currentIndex.value)
    }

    // 面包屑数据 [{name,path}]
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    // TODO
    const breadcrumbs: any = computed(() => {
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return mapPathToBreadcrumbs(userMenus, currentPath)
    })

    // console.log(route)

    watchEffect(() => {
      if (!localCache.getCache('token')) return
      const name = breadcrumbs.value[breadcrumbs.value.length - 1]?.name
      if (!name) return
      // 当tags中找不到当前route信息时，为新页面，tags push
      if (
        !tags.value.find((item: any) => {
          return item.path === route.path
        })
      ) {
        // 关闭当前页的时候不触发事件
        if (!isCurrentClose.value) {
          tags.value.push({
            name: name,
            path: route.path
          })
          currentIndex.value = tags.value.length - 1
          localCache.setCache('history', tags.value)
          localCache.setCache('historyCount', currentIndex.value)
        }
        isCurrentClose.value = false
      } else {
        // 当tags中找到当前route信息时，为历史页面，change
        currentIndex.value = tags.value.indexOf(
          tags.value.find((item: any) => {
            return item.path === route.path
          })
        )
        localCache.setCache('historyCount', currentIndex.value)
      }
    })

    // 点击标签跳转
    const handleChangeRoute = (path: string) => {
      router.push({
        path
      })
    }

    // 处理单标签关闭的情况
    const handleClose = (index: number, path: string) => {
      // 确保不可关闭的标签
      if (tags.value.length <= 1) return
      tags.value.splice(index, 1)
      // 关闭的标签为当前页
      if (path === router.currentRoute.value.path) {
        isCurrentClose.value = true
        // 当前页在tags最后一个
        if (index === tags.value.length) {
          router.push({
            path: tags.value[index - 1].path
          })
        } else {
          // 当前页不在tags最后一个
          router.push({
            path: tags.value[index].path
          })
        }
      }
      localCache.setCache('history', tags.value)
    }

    // 关闭其他
    const handleCloseOther = () => {
      if (currentIndex.value !== 0) {
        tags.value.splice(1, currentIndex.value - 1)
        tags.value.splice(2, tags.value.length - 1)
      } else {
        tags.value.splice(1, tags.value.length - 1)
      }
      localCache.setCache('history', tags.value)
    }

    return {
      tags,
      currentIndex,
      handleChangeRoute,
      handleClose,
      handleCloseOther
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-history {
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 888;
  box-shadow: 1px 2px 3px #ccc;
  .tags {
    padding-bottom: 3px;
    font-size: 14px;
    display: flex;
    overflow-x: scroll;

    p {
      cursor: pointer;
      flex-shrink: 0;
      margin: 2px 5px;
      padding: 3px 8px;
      border-radius: 4px;
      box-shadow: 1px 2px 3px #ccc;
      border: 1px solid #dcdfe6;
    }
  }
}

.current {
  color: #409eff;
  background-color: #ecf5ff;
  border-color: #b3d8ff !important;
}

.dropdown {
  flex-shrink: 0;
  width: 24px;
}

*::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  border: none;
}

*::-webkit-scrollbar-thumb {
  border-radius: 6px;
  background-color: #ddd;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: #ccc;
}
</style>
