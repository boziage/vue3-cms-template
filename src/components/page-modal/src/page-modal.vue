<template>
  <div class="page-modal">
    <el-dialog
      :title="
        dialogType === 'new'
          ? `${$t('btns.new')}${$t(`modalTitle.${modalConfig.title}`) ?? ''}`
          : dialogType === 'edit'
          ? `${$t('btns.edit')}${$t(`modalTitle.${modalConfig.title}`) ?? ''}`
          : $t('modalTitle.default')
      "
      v-model="dialogVisible"
      :width="720"
      center
      append-to-body
      destroy-on-close
    >
      <bo-form
        v-bind="modalConfig"
        v-model="formData"
        ref="boFormRef"
      ></bo-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">{{
            $t('btns.cancel')
          }}</el-button>
          <el-button type="primary" @click="handleConfirmClick">{{
            $t('btns.confirm')
          }}</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from '@/store'

import BoForm from '@/base-ui/form'

export default defineComponent({
  components: {
    BoForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const dialogVisible = ref(false)
    const dialogType = ref('')
    const formData = ref<any>({})

    const boFormRef = ref()

    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    // 点击确定
    const store = useStore()
    const handleConfirmClick = () => {
      boFormRef.value.formRef.validate((valid: any) => {
        if (valid) {
          if (Object.keys(props.defaultInfo).length) {
            // 编辑
            store.dispatch('system/editPagaDataAction', {
              pageName: props.pageName,
              editData: { ...formData.value, ...props.otherInfo },
              id: props.defaultInfo.id
            })
          } else {
            // 新建
            store.dispatch('system/createPagaDataAction', {
              pageName: props.pageName,
              newData: { ...formData.value, ...props.otherInfo }
            })
          }
          dialogVisible.value = false
        }
      })
    }

    return {
      dialogVisible,
      dialogType,
      formData,
      boFormRef,
      handleConfirmClick
    }
  }
})
</script>

<style lang="scss" scoped></style>
