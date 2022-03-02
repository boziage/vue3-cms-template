<template>
  <div class="page-search">
    <bo-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <div class="header">{{ $t('search.title') }}</div>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button icon="Refresh" @click="handleResetClick">{{
            $t('search.reset')
          }}</el-button>
          <el-button type="primary" icon="Search" @click="handleQueryClick">{{
            $t('search.search')
          }}</el-button>
        </div>
      </template>
    </bo-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import BoForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  name: 'user',
  components: {
    BoForm
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // reactive在v-model时不时有点小毛病
    // 1.双向绑定的属性应该由配置文件field动态决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      if (item.type === 'checkbox') {
        formOriginData[item.field] = []
      } else if (item.type === 'switch') {
        formOriginData[item.field] = false
      } else {
        formOriginData[item.field] = ''
      }
    }

    const formData = ref(formOriginData)

    // 2.重置
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[key] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style lang="scss" scoped>
.page-search {
  background-color: #fff;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .handle-btns {
    text-align: right;
    padding: 0 25px 20px 0;
  }
}
.header {
  text-align: left;
  padding: 0 25px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
}
</style>
