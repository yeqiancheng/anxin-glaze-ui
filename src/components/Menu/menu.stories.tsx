import type { Meta, StoryObj } from "@storybook/react-webpack5";
import React from "react";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Glaze UI组件库/Menu",
  component: Menu,
  // 关联子组件
  subcomponents: { SubMenu: SubMenu, Item: MenuItem },
  parameters: {
    layout: "padded", // 更适合菜单的布局
    docs: {
      description: {
        component: `
### Menu 菜单组件

导航菜单组件，支持水平和垂直布局，支持子菜单嵌套。

#### 特性
- 🏗️ 支持水平/垂直两种布局模式
- 📱 响应式设计，适配不同屏幕
- 🎯 支持默认选中项和回调函数
- 📂 支持多级子菜单嵌套
- 🎨 完全可自定义样式
- ♿ 键盘导航和无障碍支持

#### 组件结构
- **Menu**: 菜单容器
- **MenuItem**: 菜单项
- **SubMenu**: 子菜单（支持嵌套）

#### 使用场景
- 顶部导航栏
- 侧边栏菜单
- 下拉菜单
- 面包屑导航
        `,
      },
    },
  },
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

// 默认菜单 - 可通过 Controls 控制
export const Default: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  args: {
    mode: "horizontal",
    defaultIndex: "0",
  },
  parameters: {
    docs: {
      description: {
        story: "基础菜单，可通过 Controls 面板调整所有参数。",
      },
    },
  },
};

// 水平菜单
export const Horizontal: Story = {
  render: (args) => (
    <Menu mode="horizontal" defaultIndex="0" {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品</MenuItem>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  args: {
    mode: "horizontal",
    defaultIndex: "0",
  },
  parameters: {
    docs: {
      description: {
        story: "水平布局的基础菜单，适用于顶部导航栏。",
      },
    },
  },
};

// 垂直菜单
export const Vertical: Story = {
  render: (args) => (
    <Menu mode="vertical" defaultIndex="0" {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品管理</MenuItem>
      <MenuItem>用户管理</MenuItem>
      <MenuItem>系统设置</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: "垂直布局的菜单，适用于侧边栏导航。",
      },
    },
  },
};

// 带子菜单的水平菜单
export const HorizontalWithSubMenu: Story = {
  render: (args) => (
    <Menu mode="horizontal" defaultIndex="0" {...args}>
      <MenuItem>首页</MenuItem>
      <SubMenu title="产品中心">
        <MenuItem>产品 A</MenuItem>
        <MenuItem>产品 B</MenuItem>
        <MenuItem>产品 C</MenuItem>
      </SubMenu>
      <MenuItem>关于我们</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: "水平菜单配合子菜单，鼠标悬停展开。",
      },
    },
  },
};

// 带子菜单的垂直菜单
export const VerticalWithSubMenu: Story = {
  render: (args) => (
    <Menu
      mode="vertical"
      defaultIndex="0"
      defaultOpenSubMenus={["1"]}
      {...args}
    >
      <MenuItem>首页</MenuItem>
      <SubMenu title="产品管理">
        <MenuItem>产品列表</MenuItem>
        <MenuItem>添加产品</MenuItem>
        <MenuItem>产品分类</MenuItem>
      </SubMenu>
      <SubMenu title="用户管理">
        <MenuItem>用户列表</MenuItem>
        <MenuItem>用户权限</MenuItem>
        <MenuItem>用户统计</MenuItem>
      </SubMenu>
      <MenuItem>系统设置</MenuItem>
    </Menu>
  ),
  parameters: {
    docs: {
      description: {
        story: "垂直菜单配合子菜单，点击展开/收起。默认展开第一个子菜单。",
      },
    },
  },
};

// 禁用项菜单
export const WithDisabledItems: Story = {
  render: (args) => (
    <Menu mode="horizontal" defaultIndex="1" {...args}>
      <MenuItem>首页</MenuItem>
      <MenuItem>产品</MenuItem>
      <MenuItem disabled>维护中</MenuItem>
      <MenuItem>联系我们</MenuItem>
    </Menu>
  ),
  args: {
    mode: "horizontal",
  },
  parameters: {
    docs: {
      description: {
        story: "包含禁用菜单项的示例。",
      },
    },
  },
};
