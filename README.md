# Anxin Glaze UI

一个基于 React 的现代化 UI 组件库，仿 Ant Design 设计风格，使用 TypeScript 开发。

## 特性

- 🎨 现代化设计风格，仿 Ant Design
- ⚡️ 基于 React 18 和 TypeScript
- 📦 轻量级，按需加载
- 🎯 完整的 TypeScript 支持
- 📱 响应式设计
- 🎭 支持主题定制

## 安装

```bash
npm install anxin-glaze-ui
# 或
yarn add anxin-glaze-ui
```

## 使用

```jsx
import React from "react";
import { Button, Input, Menu } from "anxin-glaze-ui";
import "anxin-glaze-ui/dist/index.css";

function App() {
  return (
    <div>
      <Button btnType="primary">点击我</Button>
      <Input placeholder="请输入内容" />
      <Menu>
        <Menu.Item>菜单项1</Menu.Item>
        <Menu.Item>菜单项2</Menu.Item>
      </Menu>
    </div>
  );
}
```

## 组件

- **Button** - 按钮组件
  - 支持类型：`primary`、`default`、`danger`、`link`
  - 支持尺寸：`sm`、`lg`
  - 支持禁用状态
- **Input** - 输入框组件
  - 支持前置/后置内容
  - 支持图标
  - 支持搜索框
- **Menu** - 菜单组件
  - 支持水平/垂直布局
  - 支持子菜单
  - 支持默认选中项
- **Icon** - 图标组件
  - 基于 FontAwesome
  - 支持多种主题色
- **Progress** - 进度条组件
  - 支持百分比显示
  - 支持自定义高度
  - 支持主题色
- **Upload** - 上传组件
  - 支持拖拽上传
  - 支持进度显示
  - 支持文件列表
- **AutoComplete** - 自动完成组件
  - 支持异步搜索
  - 支持键盘导航
  - 支持自定义渲染
- **Transition** - 过渡动画组件
  - 支持多种动画效果
  - 基于 React Transition Group

## 本地开发测试

### 使用 npm link

```bash
# 1. 构建组件库
cd cream-design
npm run build

# 2. 创建 npm link
npm link

# 3. 在测试项目中链接组件库
cd ../cream-npm-link-test
npm link anxin-glaze-ui

# 4. 启动测试项目
npm start
```

### 测试代码示例

```jsx
import React from "react";
import { Button } from "anxin-glaze-ui";
import "anxin-glaze-ui/dist/index.css";

export default function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>anxin-glaze-ui 组件库测试</h1>

      <section style={{ marginBottom: "20px" }}>
        <h2>Button 组件</h2>
        <Button btnType="primary" style={{ marginRight: "10px" }}>
          主要按钮
        </Button>
        <Button style={{ marginRight: "10px" }}>默认按钮</Button>
        <Button btnType="danger" style={{ marginRight: "10px" }}>
          危险按钮
        </Button>
        <Button btnType="link" href="https://www.example.com">
          链接按钮
        </Button>
      </section>
    </div>
  );
}
```

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start

# 构建组件库
npm run build

# 运行测试
npm test

# 启动Storybook
npm run storybook
```

## 重要说明

### React 版本兼容性

本组件库基于 React 18 开发，使用时请确保项目中的 React 版本兼容。如果遇到版本冲突问题，请参考以下解决方案：

1. **统一 React 版本**：确保测试项目使用与组件库相同的 React 版本
2. **使用 peerDependencies**：组件库已将 React 设置为 peerDependency

### 属性名说明

- Button 组件使用 `btnType` 属性（不是 `type`）
- 支持的按钮类型：`primary`、`default`、`danger`、`link`
- 支持的按钮尺寸：`sm`、`lg`

## 许可证

MIT License
