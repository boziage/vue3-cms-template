import { ElMessage, ElMessageBox } from 'element-plus'

type CallbackType = (item?: any) => void

export function useMessage(
  pageTitle?: any,
  cb?: CallbackType,
  error?: CallbackType
) {
  const deleteMessage = (item: any) => {
    ElMessageBox.confirm(
      `此操作将永久删除该${pageTitle.value}, 是否继续?`,
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
      .then(() => {
        cb && cb(item)
      })
      .catch(() => {
        error && error()
        ElMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
  }

  const showMessage = (res: any) => {
    if (res.status === 400) {
      if (res.msg) {
        ElMessage.error(res.msg)
        throw Error(res.msg)
      }
    } else {
      ElMessage.success(res.msg)
    }
  }

  return { deleteMessage, showMessage }
}
