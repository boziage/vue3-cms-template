// 模块类型检测
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
export type IStoreType = IRootState & IRootWithModule

// state类型检测
export interface IRootState {
  lang: string
  login?: ILoginState
  system?: ISystemState
}

export interface ILoginState {
  token: string
  userMenus: any
  userInfo: any
  permissions: string[]
}

export interface ISystemState {
  usersList: any[]
  usersCount: number
  pagenum: number
  pagesize: number
}

export interface IDashboardState {
  categoryGoodsCount: any[]
  categoryGoodsSale: any[]
  categoryGoodsFavor: any[]
  addressGoodsSale: any[]
}
