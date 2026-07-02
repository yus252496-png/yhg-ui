import type { Meta, StoryObj } from '@storybook/react'
import { Form } from './Form'
import type { FormField } from './index'

const fields: FormField[] = [
  { name: 'username', label: '用户名', type: 'text', required: true, placeholder: '请输入用户名' },
  { name: 'email', label: '邮箱', type: 'text', placeholder: '请输入邮箱' },
  { name: 'age', label: '年龄', type: 'number', placeholder: '请输入年龄' },
  { name: 'role', label: '角色', type: 'select', options: [{ label: '管理员', value: 'admin' }, { label: '用户', value: 'user' }, { label: '访客', value: 'guest' }] },
  { name: 'active', label: '启用状态', type: 'switch' },
  { name: 'remark', label: '备注', type: 'textarea', placeholder: '请输入备注信息' },
]

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  tags: ['autodocs'],
  argTypes: {
    layout: { control: 'select', options: ['horizontal', 'vertical', 'inline'] },
    submitText: { control: 'text' },
    resetText: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof Form>

export const Basic: Story = {
  args: {
    fields,
    onSubmit: (values) => console.log('提交:', values),
  },
}

export const Horizontal: Story = {
  args: {
    fields,
    layout: 'horizontal',
    onSubmit: (values) => console.log('提交:', values),
  },
}

export const Vertical: Story = {
  args: {
    fields,
    layout: 'vertical',
    onSubmit: (values) => console.log('提交:', values),
  },
}

export const Inline: Story = {
  args: {
    fields: fields.slice(0, 4),
    layout: 'inline',
    onSubmit: (values) => console.log('提交:', values),
  },
}

export const WithValidation: Story = {
  args: {
    fields: [
      { name: 'email', label: '邮箱', type: 'text', required: true, placeholder: '请输入邮箱', rules: [{ pattern: /@/, message: '邮箱格式不正确' }] },
      { name: 'count', label: '数量', type: 'number', rules: [{ min: 1, message: '最小为1' }, { max: 100, message: '最大为100' }] },
      { name: 'code', label: '验证码', type: 'text', rules: [{ pattern: /^\d{6}$/, message: '请输入6位数字验证码' }] },
    ],
    onSubmit: (values) => console.log('提交:', values),
  },
}

export const WithInitialValues: Story = {
  args: {
    fields: fields.slice(0, 4),
    initialValues: { username: '张三', age: 28, role: 'admin' },
    onSubmit: (values) => console.log('提交:', values),
  },
}
