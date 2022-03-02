import type { IForm } from '@/base-ui/form'

export const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'id',
      placeholder: 'id'
    },
    {
      field: 'username',
      type: 'input',
      label: 'username',
      placeholder: 'username'
    },
    {
      field: 'mobile',
      type: 'input',
      label: 'mobile',
      placeholder: 'mobile'
    }
  ],
  labelWidth: '100px',
  itemLayout: {
    padding: '10px'
  },
  colLayout: {
    span: 8
  }
}
