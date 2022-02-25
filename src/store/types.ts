// 模块类型检测
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
export type IStoreType = IRootState & IRootWithModule

// state类型检测
export interface IRootState {
  locale: string
  login?: ILoginState
}

export interface ILoginState {
  token: string
  userMenus: any[]
}

export interface ISystemState {
  usersList: any[]
  usersCount: number
  roleList: any[]
  roleCount: number
  goodsList: any[]
  goodsCount: number
  menuList: any[]
  menuCount: number
}

export interface IDashboardState {
  categoryGoodsCount: any[]
  categoryGoodsSale: any[]
  categoryGoodsFavor: any[]
  addressGoodsSale: any[]
}
