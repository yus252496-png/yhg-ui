import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Form } from './Form'
import type { FormField } from './index'

const fields: FormField[] = [
  { name: 'username', label: '用户名', type: 'text', required: true },
  { name: 'age', label: '年龄', type: 'number' },
  { name: 'role', label: '角色', type: 'select', options: [{ label: '管理员', value: 'admin' }, { label: '用户', value: 'user' }] },
]

/* ═══════════════════════════════════════════════════════
   P0 — 渲染 & 字段类型覆盖
   ═══════════════════════════════════════════════════════ */

const allTypeFields: FormField[] = [
  { name: 'name', label: '姓名', type: 'text', required: true },
  { name: 'count', label: '数量', type: 'number' },
  { name: 'department', label: '部门', type: 'select', options: [{ label: '技术部', value: 'tech' }, { label: '市场部', value: 'mkt' }] },
  { name: 'enabled', label: '启用', type: 'switch' },
  { name: 'remark', label: '备注', type: 'textarea' },
]

describe('Form — 渲染', () => {
  it('根据 fields 渲染对应数量的表单项', () => {
    render(<Form fields={fields} />)
    expect(screen.getByText('用户名')).toBeInTheDocument()
    expect(screen.getByText('年龄')).toBeInTheDocument()
    expect(screen.getByText('角色')).toBeInTheDocument()
  })

  it('渲染提交和重置按钮', () => {
    render(<Form fields={fields} />)
    expect(screen.getByText('提交')).toBeInTheDocument()
    expect(screen.getByText('重置')).toBeInTheDocument()
  })

  it('required 字段显示星号', () => {
    render(<Form fields={fields} />)
    const label = screen.getByText('用户名')
    expect(label.parentElement).toHaveTextContent('*')
  })

  it('initialValues 预填字段值', () => {
    render(<Form fields={allTypeFields} initialValues={{ name: '张三', count: 28, department: 'tech', enabled: true, remark: 'hello' }} />)
    const nameInput = screen.getByRole('textbox', { name: /姓名/ }) as HTMLInputElement
    expect(nameInput.value).toBe('张三')

    const countInput = screen.getByRole('spinbutton', { name: /数量/ }) as HTMLInputElement
    expect(countInput.value).toBe('28')

    const deptSelect = screen.getByLabelText('部门') as HTMLSelectElement
    expect(deptSelect.value).toBe('tech')

    const switchInput = screen.getByLabelText('启用') as HTMLInputElement
    expect(switchInput.checked).toBe(true)

    const remarkInput = screen.getByRole('textbox', { name: /备注/ }) as HTMLTextAreaElement
    expect(remarkInput.value).toBe('hello')
  })
})

/* ═══════════════════════════════════════════════════════
   P0 — 5 种字段类型的交互行为
   ═══════════════════════════════════════════════════════ */

describe('Form — 字段交互', () => {
  it('text 输入文字后 value 更新', () => {
    render(<Form fields={[{ name: 'name', label: '姓名', type: 'text' }]} />)
    const input = screen.getByRole('textbox', { name: /姓名/ }) as HTMLInputElement
    fireEvent.change(input, { target: { value: '张三' } })
    expect(input.value).toBe('张三')
  })

  it('number 只接受数字输入', () => {
    render(<Form fields={[{ name: 'count', label: '数量', type: 'number' }]} />)
    const input = screen.getByRole('spinbutton', { name: /数量/ }) as HTMLInputElement
    fireEvent.change(input, { target: { value: '42' } })
    expect(input.value).toBe('42')
  })

  it('number 能接受空值', () => {
    render(<Form fields={[{ name: 'count', label: '数量', type: 'number' }]} />)
    const input = screen.getByRole('spinbutton', { name: /数量/ }) as HTMLInputElement
    fireEvent.change(input, { target: { value: '' } })
    expect(input.value).toBe('')
  })

  it('select 可选择选项', () => {
    render(<Form fields={[{ name: 'role', label: '角色', type: 'select', options: [{ label: '管理员', value: 'admin' }, { label: '用户', value: 'user' }] }]} />)
    const select = screen.getByLabelText('角色') as HTMLSelectElement
    fireEvent.change(select, { target: { value: 'admin' } })
    expect(select.value).toBe('admin')

    fireEvent.change(select, { target: { value: 'user' } })
    expect(select.value).toBe('user')
  })

  it('switch 点击可切换开关状态', () => {
    render(<Form fields={[{ name: 'enabled', label: '启用', type: 'switch' }]} />)
    const checkbox = screen.getByLabelText('启用') as HTMLInputElement
    expect(checkbox.checked).toBe(false)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })

  it('textarea 可输入多行文本', () => {
    render(<Form fields={[{ name: 'remark', label: '备注', type: 'textarea' }]} />)
    const textarea = screen.getByRole('textbox', { name: /备注/ }) as HTMLTextAreaElement
    fireEvent.change(textarea, { target: { value: '第一行\n第二行' } })
    expect(textarea.value).toBe('第一行\n第二行')
  })
})

/* ═══════════════════════════════════════════════════════
   P0 — 提交 & 多字段校验
   ═══════════════════════════════════════════════════════ */

describe('Form — 提交', () => {
  it('提交时调用 onSubmit 并传入 values', async () => {
    const onSubmit = vi.fn()
    render(
      <Form
        fields={fields}
        initialValues={{ username: '张三', age: 28, role: 'admin' }}
        onSubmit={onSubmit}
      />,
    )
    fireEvent.click(screen.getByText('提交'))
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ username: '张三', age: 28, role: 'admin' })
    })
  })

  it('required 字段为空时阻止提交并显示错误', async () => {
    const onSubmit = vi.fn()
    render(<Form fields={fields} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('提交'))

    await waitFor(() => {
      expect(screen.getByText('用户名不能为空')).toBeInTheDocument()
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('多个 required 字段同时为空时全部显示错误', async () => {
    const multiRequired: FormField[] = [
      { name: 'a', label: '字段A', type: 'text', required: true },
      { name: 'b', label: '字段B', type: 'text', required: true },
      { name: 'c', label: '字段C', type: 'text', required: true },
    ]
    const onSubmit = vi.fn()
    render(<Form fields={multiRequired} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('提交'))

    await waitFor(() => {
      expect(screen.getByText('字段A不能为空')).toBeInTheDocument()
      expect(screen.getByText('字段B不能为空')).toBeInTheDocument()
      expect(screen.getByText('字段C不能为空')).toBeInTheDocument()
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('所有字段校验通过后才提交', async () => {
    const mixed: FormField[] = [
      { name: 'email', label: '邮箱', type: 'text', rules: [{ pattern: /@/, message: '邮箱格式不对' }] },
      { name: 'count', label: '数量', type: 'number', rules: [{ min: 1, message: '最小为1' }] },
    ]
    const onSubmit = vi.fn()
    render(<Form fields={mixed} initialValues={{ email: 'bad', count: 0 }} onSubmit={onSubmit} />)
    fireEvent.click(screen.getByText('提交'))

    await waitFor(() => {
      expect(screen.getByText('邮箱格式不对')).toBeInTheDocument()
      expect(screen.getByText('最小为1')).toBeInTheDocument()
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('修改有效值后错误自动消失', async () => {
    const ruleFields: FormField[] = [
      { name: 'email', label: '邮箱', type: 'text', rules: [{ pattern: /@/, message: '邮箱格式不对' }] },
    ]
    render(<Form fields={ruleFields} />)
    const input = screen.getByLabelText('邮箱')

    // 先触发错误
    fireEvent.change(input, { target: { value: 'bad' } })
    fireEvent.blur(input)
    expect(screen.getByText('邮箱格式不对')).toBeInTheDocument()

    // 改为有效值→错误消失
    fireEvent.change(input, { target: { value: 'good@mail.com' } })
    expect(screen.queryByText('邮箱格式不对')).toBeNull()
  })

  it('switch 开关值正确提交', async () => {
    const switchFields: FormField[] = [
      { name: 'enabled', label: '启用', type: 'switch' },
    ]
    const onSubmit = vi.fn()
    render(<Form fields={switchFields} onSubmit={onSubmit} />)
    // 打开开关
    fireEvent.click(screen.getByLabelText('启用'))
    fireEvent.click(screen.getByText('提交'))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ enabled: true })
    })
  })
})

/* ═══════════════════════════════════════════════════════
   P0 — 校验
   ═══════════════════════════════════════════════════════ */

describe('Form — 校验', () => {
  const validatedFields: FormField[] = [
    {
      name: 'email',
      label: '邮箱',
      type: 'text',
      rules: [{ pattern: /@/, message: '请输入有效邮箱' }],
    },
    {
      name: 'count',
      label: '数量',
      type: 'number',
      rules: [{ min: 1, message: '不能小于1' }, { max: 10, message: '不能大于10' }],
    },
  ]

  it('pattern 不匹配时显示错误', () => {
    render(<Form fields={validatedFields} />)
    const input = screen.getByLabelText('邮箱')
    fireEvent.change(input, { target: { value: 'invalid' } })
    fireEvent.blur(input)
    expect(screen.getByText('请输入有效邮箱')).toBeInTheDocument()
  })

  it('pattern 匹配时无错误', () => {
    render(<Form fields={validatedFields} />)
    const input = screen.getByLabelText('邮箱')
    fireEvent.change(input, { target: { value: 'a@b.com' } })
    fireEvent.blur(input)
    expect(screen.queryByText('请输入有效邮箱')).toBeNull()
  })

  it('数字 min 校验', () => {
    render(<Form fields={validatedFields} />)
    const input = screen.getByLabelText('数量')
    fireEvent.change(input, { target: { value: '0' } })
    fireEvent.blur(input)
    expect(screen.getByText('不能小于1')).toBeInTheDocument()
  })

  it('数字 max 校验', () => {
    render(<Form fields={validatedFields} />)
    const input = screen.getByLabelText('数量')
    fireEvent.change(input, { target: { value: '11' } })
    fireEvent.blur(input)
    expect(screen.getByText('不能大于10')).toBeInTheDocument()
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — 同步 validator 校验
   ═══════════════════════════════════════════════════════ */

describe('Form — 自定义校验', () => {
  it('自定义 validator 校验失败', () => {
    const fields: FormField[] = [
      {
        name: 'code',
        label: '编码',
        type: 'text',
        rules: [{ validator: (v) => v === 'YHG-001', message: '编码必须为 KUKA-001' }],
      },
    ]
    render(<Form fields={fields} />)
    const input = screen.getByLabelText('编码')
    fireEvent.change(input, { target: { value: 'OTHER' } })
    fireEvent.blur(input)
    expect(screen.getByText('编码必须为 KUKA-001')).toBeInTheDocument()
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — 三种布局
   ═══════════════════════════════════════════════════════ */

describe('Form — 布局', () => {
  it('horizontal 为默认布局', () => {
    const { container } = render(<Form fields={fields} />)
    expect(container.firstChild).toHaveClass('horizontal')
  })

  it('支持 vertical 布局', () => {
    const { container } = render(<Form fields={fields} layout="vertical" />)
    expect(container.firstChild).toHaveClass('vertical')
  })

  it('支持 inline 布局', () => {
    const { container } = render(<Form fields={fields} layout="inline" />)
    expect(container.firstChild).toHaveClass('inline')
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — 重置 & 边界
   ═══════════════════════════════════════════════════════ */

describe('Form — 重置', () => {
  it('重置按钮清空所有值并触发 onReset', () => {
    const onReset = vi.fn()
    render(<Form fields={fields} onReset={onReset} />)
    const usernameInput = screen.getByRole('textbox', { name: /用户名/ }) as HTMLInputElement
    fireEvent.change(usernameInput, { target: { value: '张三' } })
    fireEvent.click(screen.getByText('重置'))
    expect(usernameInput.value).toBe('')
    expect(onReset).toHaveBeenCalled()
  })

  it('重置后错误信息也清空', async () => {
    render(<Form fields={[{ name: 'x', label: '字段X', type: 'text', required: true }]} />)
    fireEvent.click(screen.getByText('提交'))
    await waitFor(() => {
      expect(screen.getByText('字段X不能为空')).toBeInTheDocument()
    })
    fireEvent.click(screen.getByText('重置'))
    expect(screen.queryByText('字段X不能为空')).toBeNull()
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — 自定义配置 & 边界情况
   ═══════════════════════════════════════════════════════ */

describe('Form — 自定义配置', () => {
  it('支持自定义 submitText 和 resetText', () => {
    render(<Form fields={[{ name: 'a', label: 'A', type: 'text' }]} submitText="保存" resetText="取消" />)
    expect(screen.getByText('保存')).toBeInTheDocument()
    expect(screen.getByText('取消')).toBeInTheDocument()
  })

  it('空 fields 数组不报错', () => {
    const { container } = render(<Form fields={[]} />)
    expect(container.querySelector('form')).toBeInTheDocument()
    expect(screen.getByText('提交')).toBeInTheDocument()
  })

  it('className 传递到根元素', () => {
    const { container } = render(<Form fields={[{ name: 'a', label: 'A', type: 'text' }]} className="my-form" />)
    expect(container.firstChild).toHaveClass('my-form')
  })

  it('custom component 覆盖默认渲染', () => {
    const customField: FormField[] = [
      { name: 'custom', label: '自定义', type: 'text', component: <div data-testid="custom-field">自定义控件</div> },
    ]
    render(<Form fields={customField} />)
    expect(screen.getByTestId('custom-field')).toBeInTheDocument()
    expect(screen.getByText('自定义控件')).toBeInTheDocument()
  })

  it('非 required 字段不显示星号', () => {
    render(<Form fields={[{ name: 'a', label: 'A', type: 'text' }]} />)
    const label = screen.getByText('A')
    expect(label.parentElement).not.toHaveTextContent('*')
  })
})
