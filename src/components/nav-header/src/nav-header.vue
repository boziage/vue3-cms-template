<template>
  <div class="nav-header">
    <el-icon class="fold-menu" id="hamburger" @click="handleFoldClick">
      <component :is="isFold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <div class="content">
      <bo-breadcrumb :breadcrumbs="breadcrumbs" />
      <div class="content-right">
        <header-utils class="utils" />
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, defineEmits } from 'vue'
import BoBreadcrumb from '@/base-ui/breadcrumb'

import { useRoute } from 'vue-router'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}

// 面包屑数据 [{name,path}]
const route = useRoute()
const breadcrumbs = ref([] as any[])
watch(
  route,
  () => {
    const arr = route.matched[route.matched.length - 1]?.path
      .split('/')
      .slice(2)
    breadcrumbs.value = arr
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
.nav-header {
  display: flex;
  align-items: center;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    flex: 1;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .utils {
      flex: 1;
      margin-right: 10px;
    }

    &-right {
      width: 200px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
