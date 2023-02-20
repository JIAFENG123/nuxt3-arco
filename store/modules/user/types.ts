interface tagItem {
  tag: string
  urId: number
  urName: string
}
export interface UserState {
  token: string
  name: string
  workcode: string
  systemCode: number
  actionUrl: object[]
  permissions: tagItem[] // 权限tags列表
  isPermissionTag: boolean
}
