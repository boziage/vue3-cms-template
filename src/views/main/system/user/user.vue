<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      ref="pageContentRef"
      pageName="users"
      :contentTableConfig="contentTableConfig"
    ></page-content>
  </div>
</template>

<script setup>
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
</script>

<style lang="scss" scoped></style>
