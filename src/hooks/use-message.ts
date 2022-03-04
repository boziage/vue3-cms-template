import { ElMessage, ElMessageBox } from 'element-plus'

import i18n from '@/i18n'
const t = i18n.global.t

type CallbackType = (item?: any) => void

export function useMessage(
  pageTitle?: any,
  cb?: CallbackType,
  error?: CallbackType
) {
  const deleteMessage = (item: any) => {
    ElMessageBox.confirm(t('dialog.deleteTitle'), t('modalTitle.default'), {
      confirmButtonText: t('btns.confirm'),
      cancelButtonText: t('btns.cancel'),
      type: 'warning',
      customClass: 'deleteMessage'
    })
      .then(() => {
        cb && cb(item)
      })
      .catch(() => {
        error && error()
        ElMessage({
          type: 'info',
          message: t('dialog.cancelTitle')
        })
      })
  }

  const showMessage = (res: any) => {
    if (res.status === 400) {
      if (res.msg) {
        ElMessage.error(pageTitle ?? res.msg)
        throw Error(res.msg)
      }
    } else {
      ElMessage.success(pageTitle ?? res.msg)
    }
  }

  return { deleteMessage, showMessage }
}
