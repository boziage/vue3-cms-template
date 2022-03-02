type IFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'datepicker'
  | 'switch'
  | 'textarea'
  | 'checkbox'

export interface IFormItem {
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // select
  options?: any[]
  // other
  otherOptions?: any
  isHidden?: boolean
}

export interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  colLayout?: any
  itemLayout?: any
  title?: string
  rules?: any
}
