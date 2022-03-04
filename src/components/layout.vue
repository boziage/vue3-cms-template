<template>
  <div class="layout">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '240px'">
        <nav-menu :collapse="isCollapse" />
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <nav-header @foldChange="handleFoldChange" />
        </el-header>
        <nav-history class="page-history" />
        <el-main class="page-content">
          <div class="page-info">
            <router-view class="router-view" v-slot="{ Component }">
              <transition
                enter-active-class="animate__animated animate__fadeInLeft"
                leave-active-class="animate__animated animate__fadeOutRight"
                ><component :is="Component"
              /></transition>
            </router-view>
          </div>
        </el-main>
        <el-footer class="page-footer">
          Copyright © 2021 boziage's demo 粤ICP备21xxxxxx号
          <span>软件版本v1.1</span>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import NavMenu from '@/components/nav-menu'
// import NavHeader from '@/components/nav-header'
// import NavHistory from '@/components/nav-history'

const isCollapse = ref(false)
const handleFoldChange = (isFold: boolean) => {
  isCollapse.value = isFold
}
</script>

<style lang="scss" scoped>
.layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1280px;
  min-height: 720px;
}

.nav-history {
  height: 30px;
}

.main-content,
.page {
  height: 100%;
  // min-width: 900px;
}

.page-content {
  // height: calc(100% - 48px);
  .page-info {
    // background-color: #fff;
    position: relative;

    border-radius: 5px;
    height: 100%;
    overflow-x: hidden;
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
}

.el-header,
.el-footer {
  color: #333;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  z-index: 10000;
}

.el-header {
  height: 48px !important;
  padding: 0 12px;
}

.el-footer {
  height: 48px !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  // line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; // firefox
  -ms-overflow-style: none; // IE 10+
  user-select: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}

.page-history {
  user-select: none;
}

.page-footer {
  font-size: 14px;
  span {
    padding-left: 30px;
  }
}

.router-view {
  position: absolute;

  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
</style>
