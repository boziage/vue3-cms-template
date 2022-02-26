export const contentTableConfig = {
  title: '用户列表',
  propList: [
    {
      prop: 'username',
      label: '用户名',
      minWidth: '100',
      slotName: 'username'
    },
    {
      prop: 'email',
      label: '邮箱',
      minWidth: '100',
      slotName: 'email'
    },
    {
      prop: 'mobile',
      label: '手机号码',
      minWidth: '100',
      slotName: 'mobile'
    },
    {
      prop: 'role_name',
      label: '角色',
      minWidth: '100',
      slotName: 'role_name'
    },
    {
      prop: 'mg_state',
      label: '状态',
      minWidth: '100',
      slotName: 'status'
    },
    {
      prop: 'create_time',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
