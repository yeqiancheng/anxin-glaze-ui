import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Button from "./button";

import mdx from "./button.mdx";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Glaze UI组件库/Button",
  component: Button,
  parameters: {
    layout: "centered", // 居中
    docs: {
      page: mdx, // 使用完整的 MDX 页面
    },
  },
  // 参数信息
  argTypes: {
    btnType: {
      //多选
      control: {
        type: "select",
      },
      // 列表
      options: ["default", "primary", "danger", "link"],
      description: "按钮类型",
      // 文档表格里的，包括类型和默认值
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "lg"],
      description: "按钮尺寸",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "sm" },
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
      description: "禁用状态",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: {
        type: "text",
      },
      description: "按钮内容",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    href: {
      control: {
        type: "text",
      },
      description: "链接地址（仅 link 类型有效）",
      table: {
        type: { summary: "string" },
      },
      if: { arg: "btnType", eq: "link" },
    },
    className: {
      control: {
        type: "text",
      },
      description: "自定义 CSS 类名",
      table: {
        type: { summary: "string" },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  // 参数设置
  args: {
    btnType: "primary",
    children: "主要按钮",
    size: "sm",
    disabled: false,
  },
  // docs文档里的描述
  parameters: {
    docs: {
      description: {
        story: "主要按钮，用于重要操作如提交、确认等。",
      },
    },
  },
};

export const Default: Story = {
  args: {
    btnType: "default",
    children: "默认按钮",
    size: "sm",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "默认按钮，用于次要操作如取消、重置等。",
      },
    },
  },
};

export const Danger: Story = {
  args: {
    btnType: "danger",
    children: "危险按钮",
    size: "sm",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "危险按钮，用于删除、清空等高风险操作。",
      },
    },
  },
};

export const Link: Story = {
  args: {
    btnType: "link",
    children: "链接按钮",
    href: "https://example.com",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story: "链接按钮，用于页面跳转。需要配置 href 属性。",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    btnType: "primary",
    children: "禁用按钮",
    size: "sm",
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: "禁用状态的按钮，不可点击。",
      },
    },
  },
};
