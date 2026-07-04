# yhg-ui

工业级 React 组件库。

> 工业赛博风格 · 深色主题 · TypeScript First · Design Tokens 驱动

---

## 快速开始

```bash
# 安装依赖
pnpm install

# 启动 Storybook（组件文档站）
pnpm storybook
# → http://localhost:6006

# 构建组件库
pnpm build

# 运行测试
pnpm test
```

---

## 项目结构

```
yhg-ui/
├── packages/
│   └── ui/                    # 组件库主体 @yhg/ui
│       ├── src/
│       │   ├── index.ts           # 统一导出入口
│       │   ├── tokens/            # Design Tokens（CSS 变量）
│       │   │   ├── colors.css
│       │   │   ├── typography.css
│       │   │   └── spacing.css
│       │   ├── Button/            # 每个组件一个目录
│       │   │   ├── index.ts
│       │   │   ├── Button.tsx
│       │   │   ├── Button.module.css
│       │   │   ├── Button.test.tsx
│       │   │   └── Button.stories.tsx
│       │   ├── Table/
│       │   │   ├── index.ts
│       │   │   ├── Table.tsx
│       │   │   ├── Table.module.css
│       │   │   ├── Table.test.tsx
│       │   │   ├── Table.stories.tsx
│       │   │   └── Pagination.tsx
│       │   ├── hooks/
│       │   └── utils/
│       ├── dist/               # 构建产物
│       └── __tests__/          # 全局测试配置
│
├── apps/
│   └── storybook/              # Storybook 文档站
│       ├── .storybook/
│       │   ├── main.ts
│       │   ├── preview.tsx
│       │   └── manager.ts
│       └── stories/
│
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

---

## 技术栈

| 层 | 选型 |
|:---|:-----|
| 框架 | React 19 + TypeScript 6 (strict) |
| 构建 | Vite 8 (lib mode) |
| 样式 | CSS Modules + CSS Variables (Design Tokens) |
| 测试 | Vitest + @testing-library/react |
| 文档 | Storybook 8 |
| 包管理 | pnpm workspace (monorepo) |

---

## 使用组件

### 在项目内引用

```tsx
import { Button, Table } from '@yhg/ui'
import '@yhg/ui/dist/ui.css'

function Page() {
  return (
    <>
      <Button variant="primary" size="lg">提交</Button>
      <Table
        columns={[
          { key: 'name', title: '姓名', dataIndex: 'name', sortable: true },
          { key: 'age', title: '年龄', dataIndex: 'age' },
        ]}
        dataSource={data}
        rowKey="id"
      />
    </>
  )
}
```

### 从 Git 安装（当前方式）

```bash
npm install git+https://github.com/yus252496-png/yhg-ui.git#main
```

### 构建产物

```
dist/
├── index.js          # ESM 格式
├── index.cjs         # CJS 格式
├── index.d.ts        # 类型声明
├── ui.css            # 所有样式（含 tokens）
└── tokens/           # Design Tokens 独立文件
```

---

## 设计原则

1. **变化方向一致** → 相同原因修改的放一起
2. **依赖向内** → 模块间不互相引用，编排层控制通信
3. **封装状态** → 内部状态不暴露
4. **复用潜力排序** → 先抽通用组件

所有颜色、字号、间距通过 CSS 变量（`var(--yhg-*)`）引用，支持一键换肤。

---

## 新增组件

```bash
# 1. 复制已有组件目录
cp -r packages/ui/src/Button packages/ui/src/MyComponent

# 2. 改文件名 + 内容
#    MyComponent.tsx / MyComponent.module.css / 测试 / Stories

# 3. 在 src/index.ts 注册导出
```

每个组件必须包含：
- `.tsx` — 组件实现
- `.module.css` — 样式（引用 CSS 变量）
- `.test.tsx` — 测试
- `.stories.tsx` — Storybook 文档
- `index.ts` — 导出

---

## 设计语言（工业赛博风格）

| 属性 | 值 |
|:-----|:----|
| 主色 | `#00d4ff` 科技蓝 |
| 运行态 | `#00ff88` 霓虹绿 |
| 警告态 | `#ffb300` 琥珀橙 |
| 报错态 | `#ff4757` 故障红 |
| 页面背景 | `#0d1117` |
| 卡片背景 | `rgba(10,10,30,0.75)` 玻璃态 |
| HUD 字体 | `'Courier New', monospace` |

---

## 项目命令

| 命令 | 作用 |
|:----|:-----|
| `pnpm dev` | 监听模式构建组件库 |
| `pnpm build` | 构建组件库（ESM + CJS） |
| `pnpm test` | 运行所有测试 |
| `pnpm storybook` | 启动 Storybook（localhost:6006） |
| `pnpm build:storybook` | 构建 Storybook 静态文件 |
