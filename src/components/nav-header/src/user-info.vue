<template>
  <div class="user-info">
    <el-dropdown placement="bottom-start">
      <span class="el-dropdown-link">
        <span class="el-dropdown-name">{{ name }}</span>
        <el-avatar
          :size="30"
          shape="square"
          src="https://img1.baidu.com/it/u=1925715390,133119052&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
        ></el-avatar>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item icon="CircleClose" @click="handleExitClick">{{
            $t('btns.logout')
          }}</el-dropdown-item>
          <el-dropdown-item divided
            >{{ $t('roles.role') }}：{{ $t(`roles.${role}`) }}</el-dropdown-item
          >
          <!-- <el-dropdown-item>系统管理</el-dropdown-item> -->
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'

const store = useStore()
const name = computed(() => 'boziage')
const role = computed(() => 'administrator')

const handleExitClick = () => {
  store.dispatch('login/logoutAction')
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  .el-dropdown-name {
    padding-right: 5px;
  }
}

:deep(.el-dropdown-menu__item) {
  white-space: nowrap;
}
</style>
