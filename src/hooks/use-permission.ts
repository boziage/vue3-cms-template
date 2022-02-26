import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return permissions.some((item) => item === verifyPermission)

  // name = "boziage"
  // !name = false
  // return !!permissions.find((item) => item === verifyPermission)
}
