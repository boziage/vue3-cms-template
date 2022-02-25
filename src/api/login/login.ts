import boRequest from '@/service'
import type { IDataType } from '../types'

enum LoginAPI {
  Login = '/login',
  LoginUserInfo = '/users/', // users/:id
  UserMenus = '/role/' // role/:id/menu
}

export function loginRequest(data: any) {
  return boRequest.post<IDataType>({
    url: LoginAPI.Login,
    data
  })
}
