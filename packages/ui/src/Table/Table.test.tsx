import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Table } from './Table'
import type { Column } from './index'

interface User {
  id: number
  name: string
  age: number
  role: string
}

const columns: Column<User>[] = [
  { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
  { key: 'age', title: '年龄', dataIndex: 'age', sortable: true },
  { key: 'role', title: '角色', dataIndex: 'role' },
]

const data: User[] = [
  { id: 1, name: '张三', age: 28, role: '工程师' },
  { id: 2, name: '李四', age: 35, role: '设计师' },
  { id: 3, name: '王五', age: 42, role: '产品经理' },
]

/* ═══════════════════════════════════════════════════════
   P0 — 渲染 & 基本数据展示
   ═══════════════════════════════════════════════════════ */

describe('Table — 渲染', () => {
  it('渲染列标题', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" />)
    columns.forEach((col) => {
      expect(screen.getByText(col.title)).toBeInTheDocument()
    })
  })

  it('渲染数据行', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" />)
    data.forEach((record) => {
      expect(screen.getByText(record.name)).toBeInTheDocument()
    })
  })

  it('dataIndex 从数据中取值', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" />)
    expect(screen.getByText('工程师')).toBeInTheDocument()
    expect(screen.getByText('设计师')).toBeInTheDocument()
  })

  it('render 函数覆盖 dataIndex', () => {
    const cols: Column<User>[] = [
      { key: 'name', title: '姓名', render: (_, record) => `★ ${record.name}` },
    ]
    render(<Table columns={cols} dataSource={data} rowKey="id" />)
    expect(screen.getByText('★ 张三')).toBeInTheDocument()
  })
})

/* ═══════════════════════════════════════════════════════
   P0 — 排序：asc → desc → none 三轮、数字排序、不可排序列
   ═══════════════════════════════════════════════════════ */

describe('Table — 排序', () => {
  it('asc → desc → none 三轮切换，每次结果正确', () => {
    render(<Table columns={columns} dataSource={[...data]} rowKey="id" />)
    const nameHeader = screen.getByText('姓名')

    // localeCompare 在中文环境下按拼音排序：李(lǐ) → 王(wáng) → 张(zhāng)
    // 第一次点击 → asc（李 → 王 → 张）
    fireEvent.click(nameHeader)
    let rows = screen.getAllByRole('row')
    expect(rows[1].textContent).toContain('李四')
    expect(rows[3].textContent).toContain('张三')

    // 第二次点击 → desc（张 → 王 → 李）
    fireEvent.click(nameHeader)
    rows = screen.getAllByRole('row')
    expect(rows[1].textContent).toContain('张三')
    expect(rows[3].textContent).toContain('李四')

    // 第三次点击 → none，恢复原始顺序（张 → 李 → 王）
    fireEvent.click(nameHeader)
    rows = screen.getAllByRole('row')
    expect(rows[1].textContent).toContain('张三')
    expect(rows[3].textContent).toContain('王五')
  })

  it('数字字段排序升序', () => {
    render(<Table columns={columns} dataSource={[...data]} rowKey="id" />)
    fireEvent.click(screen.getByText('年龄'))
    const rows = screen.getAllByRole('row')
    expect(rows[1].textContent).toContain('28')
    expect(rows[3].textContent).toContain('42')
  })

  it('不可排序的列点击不改变顺序', () => {
    render(<Table columns={columns} dataSource={[...data]} rowKey="id" />)
    fireEvent.click(screen.getByText('角色'))
    const rows = screen.getAllByRole('row')
    expect(rows[1].textContent).toContain('张三')
    expect(rows[3].textContent).toContain('王五')
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — 排序进阶：自定义 sorter、切换排序列
   ═══════════════════════════════════════════════════════ */

describe('Table — 排序进阶', () => {
  it('自定义 sorter 函数覆盖默认排序', () => {
    const cols: Column<User>[] = [
      {
        key: 'age',
        title: '年龄',
        dataIndex: 'age',
        sortable: true,
        sorter: (a, b) => b.age - a.age, // 降序排列
      },
    ]
    render(<Table columns={cols} dataSource={[...data]} rowKey="id" />)
    fireEvent.click(screen.getByText('年龄'))
    const rows = screen.getAllByRole('row')
    expect(rows[1].textContent).toContain('42')
    expect(rows[3].textContent).toContain('28')
  })

  it('切换排序列时旧列重置、新列升序', () => {
    render(<Table columns={columns} dataSource={[...data]} rowKey="id" />)
    fireEvent.click(screen.getByText('年龄')) // age asc: 张(28) → 李(35) → 王(42)
    fireEvent.click(screen.getByText('姓名')) // 切换到 name asc: 李 → 王 → 张（拼音）
    const rows = screen.getAllByRole('row')
    expect(rows[1].textContent).toContain('李四')
  })
})

/* ═══════════════════════════════════════════════════════
   P0 — Loading 状态
   ═══════════════════════════════════════════════════════ */

describe('Table — loading', () => {
  it('显示遮罩和文案，不渲染数据行', () => {
    render(<Table columns={columns} dataSource={data} rowKey="id" loading />)
    expect(screen.getByText('加载中...')).toBeInTheDocument()
    expect(screen.queryByText('张三')).toBeNull()
  })
})

/* ═══════════════════════════════════════════════════════
   P0 — 空数据状态
   ═══════════════════════════════════════════════════════ */

describe('Table — 空数据', () => {
  it('显示默认空文案', () => {
    render(<Table columns={columns} dataSource={[]} rowKey="id" />)
    expect(screen.getByText('暂无数据')).toBeInTheDocument()
  })

  it('支持自定义空数据文案', () => {
    render(<Table columns={columns} dataSource={[]} rowKey="id" emptyText="没有找到数据" />)
    expect(screen.getByText('没有找到数据')).toBeInTheDocument()
  })
})

/* ═══════════════════════════════════════════════════════
   P0 — 分页：页码切换
   ═══════════════════════════════════════════════════════ */

describe('Table — 分页', () => {
  const manyData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: 20 + i,
    role: '成员',
  }))

  it('切换页码触发 onChange', () => {
    const onChange = vi.fn()
    render(
      <Table
        columns={columns}
        dataSource={manyData}
        rowKey="id"
        pagination={{ pageSize: 5, current: 1, onChange }}
      />,
    )
    fireEvent.click(screen.getByText('2'))
    expect(onChange).toHaveBeenCalledWith(2, 5)
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — 分页进阶：prev/next 按钮、首尾页禁用、不足一页隐藏
   ═══════════════════════════════════════════════════════ */

describe('Table — 分页进阶', () => {
  const manyData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `用户${i + 1}`,
    age: 20 + i,
    role: '成员',
  }))

  it('上一页和下一页按钮触发正确的 onChange', () => {
    const onChange = vi.fn()
    render(
      <Table
        columns={columns}
        dataSource={manyData}
        rowKey="id"
        pagination={{ pageSize: 5, current: 2, onChange }}
      />,
    )

    fireEvent.click(screen.getByLabelText('上一页'))
    expect(onChange).toHaveBeenCalledWith(1, 5)

    fireEvent.click(screen.getByLabelText('下一页'))
    expect(onChange).toHaveBeenCalledWith(3, 5)
  })

  it('第一页时上一页按钮 disabled', () => {
    render(
      <Table
        columns={columns}
        dataSource={manyData}
        rowKey="id"
        pagination={{ pageSize: 5, current: 1 }}
      />,
    )
    expect(screen.getByLabelText('上一页')).toBeDisabled()
  })

  it('最后一页时下一页按钮 disabled', () => {
    render(
      <Table
        columns={columns}
        dataSource={manyData}
        rowKey="id"
        pagination={{ pageSize: 5, current: 4 }}
      />,
    )
    expect(screen.getByLabelText('下一页')).toBeDisabled()
  })

  it('数据不足一页时不显示分页器', () => {
    render(
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{ pageSize: 10, current: 1 }}
      />,
    )
    expect(screen.queryByLabelText('上一页')).toBeNull()
    expect(screen.queryByLabelText('下一页')).toBeNull()
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — render 进阶：参数验证
   ═══════════════════════════════════════════════════════ */

describe('Table — render 进阶', () => {
  it('render 接收正确的参数 (value, record, index)', () => {
    const renderFn = vi.fn(() => '')
    const cols: Column<User>[] = [
      { key: 'name', title: '姓名', dataIndex: 'name', render: renderFn },
    ]
    render(<Table columns={cols} dataSource={data} rowKey="id" />)
    expect(renderFn).toHaveBeenCalledTimes(3)
    expect(renderFn).toHaveBeenNthCalledWith(1, '张三', data[0], 0)
    expect(renderFn).toHaveBeenNthCalledWith(2, '李四', data[1], 1)
    expect(renderFn).toHaveBeenNthCalledWith(3, '王五', data[2], 2)
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — 行事件 (onRow)
   ═══════════════════════════════════════════════════════ */

describe('Table — onRow', () => {
  it('行点击触发 onRow.onClick', () => {
    const onRowClick = vi.fn()
    render(
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        onRow={() => ({ onClick: onRowClick })}
      />,
    )
    fireEvent.click(screen.getByText('张三').closest('td')!)
    expect(onRowClick).toHaveBeenCalled()
  })

  it('不传 onRow 不报错', () => {
    expect(() =>
      render(<Table columns={columns} dataSource={data} rowKey="id" />),
    ).not.toThrow()
  })
})

/* ═══════════════════════════════════════════════════════
   P1 — Props 透传：className、style
   ═══════════════════════════════════════════════════════ */

describe('Table — Props 透传', () => {
  it('className 透传到根元素', () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} rowKey="id" className="my-table" />,
    )
    expect(container.firstElementChild).toHaveClass('my-table')
  })

  it('style 透传到根元素', () => {
    const { container } = render(
      <Table columns={columns} dataSource={data} rowKey="id" style={{ width: '500px' }} />,
    )
    expect(container.firstElementChild).toHaveStyle({ width: '500px' })
  })
})
