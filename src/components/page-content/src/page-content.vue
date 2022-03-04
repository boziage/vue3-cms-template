<template>
  <div ref="pageContentRef" class="page-content">
    <bo-table
      :listData="listData"
      :listCount="listCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
      @selectionChange="handleSelectionChange"
    >
      <!-- header插槽 -->
      <template #headerHandler>
        <el-button
          type="text"
          icon="RefreshRight"
          @click="handleRefresh"
        ></el-button>
        <el-button
          v-if="isCreate"
          type="primary"
          @click="handleNewClick"
          size="default"
          >{{ $t('btns.new') }}{{ $t(`tableTitle.${pageTitle}`) }}</el-button
        >
      </template>
      <!-- 列中插槽 -->
      <template #status="scope">
        <el-button
          plain
          size="small"
          :type="scope.row.mg_state ? 'success' : 'danger'"
          @click="handleStateClick(scope.row)"
        >
          {{ scope.row.mg_state ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="scope">
        <span>{{ $filters.formatTimeSecond(scope.row.create_time) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTimeSecond(scope.row.update_time) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            v-if="isUpdate"
            icon="Edit"
            size="small"
            type="text"
            @click="handleEditClick(scope.row)"
            >{{ $t('btns.edit') }}</el-button
          >
          <el-button
            v-if="isDelete"
            icon="Delete"
            size="small"
            type="text"
            @click="handleDeleteClick(scope.row)"
            >{{ $t('btns.delete') }}</el-button
          >
        </div>
      </template>

      <!-- page-content中动态插入剩余插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </bo-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

import { useMessage } from '@/hooks/use-message'

import BoTable from '@/base-ui/table'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    BoTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()

    // 获取菜单名字
    const pageTitle = computed(() => {
      return props.contentTableConfig.title
    })

    // 分页器相关
    const pageInfo = ref({ pagenum: 1, pagesize: 10 })
    watch(pageInfo, () => getPageData())

    // 发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      // if (!isQuery) return
      if (isQuery) {
        store.dispatch('system/getPageListAction', {
          pageName: props.pageName,
          queryInfo: {
            pagenum: pageInfo.value.pagenum,
            pagesize: pageInfo.value.pagesize,
            ...queryInfo
          }
        })
      } else {
        store.commit(
          `system/change${
            props.pageName.slice(0, 1).toUpperCase() + props.pageName.slice(1)
          }List`,
          []
        )
        store.commit(
          `system/change${
            props.pageName.slice(0, 1).toUpperCase() + props.pageName.slice(1)
          }Count`,
          0
        )
      }
    }

    // CUD操作
    // 获取操作权限(CRUD)
    const isCreate = usePermission(props.pageName, 'create')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    getPageData()

    const handleRefresh = () => {
      pageInfo.value = { ...pageInfo.value, pagenum: 1 }
    }

    // select改变时获取选择的数据
    const handleSelectionChange = (arr: any) => {
      console.log(arr)
    }

    const deleteCb = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.pageName,
        id: item.id
      })
    }

    const { deleteMessage } = useMessage(pageTitle, deleteCb)

    const handleStateClick = (row: any) => {
      if (isQuery) {
        store.dispatch('system/changeStateAction', {
          pageName: props.pageName,
          row
        })
      }
    }

    const handleDeleteClick = (item: any) => {
      deleteMessage(item)
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }

    // vuex获取数据
    const listData = computed(
      () => store.getters[`system/pageListData`](props.pageName) ?? []
    )
    const listCount = computed(() =>
      store.getters[`system/pageListCount`](props.pageName)
    )

    // 获取其他动态插槽名称
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === 'status') return false
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )

    return {
      listData,
      listCount,
      pageInfo,
      pageTitle,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleStateClick,
      handleDeleteClick,
      handleNewClick,
      handleEditClick,
      handleSelectionChange,
      handleRefresh
    }
  }
})
</script>

<style lang="scss" scoped>
.page-content {
  padding: 20px;
  background-color: #fff;
  margin-top: 20px;
  // border-top: 20px solid #f5f5f5;
  border-radius: 5px;
  border: 1px solid #e4e7ed;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
