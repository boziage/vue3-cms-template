import type { IForm } from '@/base-ui/form'
import i18n from '@/i18n'
const t = i18n.global.t

export const modalConfig: IForm = {
  title: 'user',
  formItems: [
    {
      field: 'username',
      type: 'input',
      label: 'username',
      placeholder: 'username',
      rules: [
        {
          required: true,
          message: t('message.username'),
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'password',
      type: 'password',
      label: 'password',
      placeholder: 'password',
      isHidden: true,
      rules: [
        {
          required: true,
          message: t('message.password'),
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'email',
      type: 'input',
      label: 'email',
      placeholder: 'email',
      rules: [
        {
          required: true,
          message: t('message.email'),
          trigger: 'blur'
        }
      ]
    },
    {
      field: 'mobile',
      type: 'input',
      label: 'mobile',
      placeholder: 'mobile',
      rules: [
        {
          required: true,
          message: t('message.mobile'),
          trigger: 'blur'
        }
      ]
    }
  ],
  colLayout: { span: 24 },
  itemLayout: {}
}
