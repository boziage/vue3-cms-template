<template>
  <div class="text-link">
    <template v-for="item in textLinkConfig" :key="item.title">
      <div class="item">
        <span class="title">{{ item.title }} : </span>
        <el-link class="link" type="info">{{ item.desp }}</el-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    textLinkConfig: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.text-link {
  padding: 0 15px;
  // margin-bottom: 40px;
  text-align: left;

  .item {
    margin: 10px;

    .title {
      position: relative;
      // display: inline-block;
      margin-right: 10px;
    }

    .title::before {
      position: absolute;
      top: 45%;
      left: -15px;
      width: 5px;
      height: 5px;
      background: black;
      border-radius: 100%;
      content: '';
    }

    .link {
      position: relative;
      margin-top: -1px;
    }

    .link:hover {
      color: #66b1ff;
    }
  }
}
</style>
