<template>
  <div class="screen-full" @click="toggle" id="screenfull">
    <svg-icon
      :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'"
    ></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
</script>

<style lang="scss" scoped>
.screen-full {
  display: flex;
  align-items: center;
}
</style>
