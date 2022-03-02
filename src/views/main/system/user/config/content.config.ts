export const contentTableConfig = {
  title: 'user',
  propList: [
    {
      prop: 'username',
      label: 'username',
      minWidth: '100',
      slotName: 'username'
    },
    {
      prop: 'email',
      label: 'email',
      minWidth: '100',
      slotName: 'email'
    },
    {
      prop: 'mobile',
      label: 'mobile',
      minWidth: '100',
      slotName: 'mobile'
    },
    {
      prop: 'role_name',
      label: 'role_name',
      minWidth: '100',
      slotName: 'role_name'
    },
    {
      prop: 'mg_state',
      label: 'mg_state',
      minWidth: '100',
      slotName: 'status'
    },
    {
      prop: 'create_time',
      label: 'create_time',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      label: 'action',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  showIndexColumn: true,
  showSelectColumn: true
}
