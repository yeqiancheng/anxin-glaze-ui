import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Progress from "./progress";
import mdx from "./progress.mdx";

const meta = {
  title: "Glaze UI组件库/Progress",
  component: Progress,
  parameters: {
    layout: "centered", // 居中
    docs: {
      page: mdx, // 使用完整的 MDX 页面
    },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 30,
  },
};

export const Primary: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 60,
    theme: "primary",
  },
};

export const Success: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 100,
    theme: "success",
  },
};

export const Warning: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 75,
    theme: "warning",
  },
};

export const Danger: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 25,
    theme: "danger",
  },
};

export const CustomHeight: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 50,
    strokeHeight: 30,
    theme: "primary",
  },
};

export const WithoutText: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 80,
    showText: false,
    theme: "success",
  },
};

export const ThinProgress: Story = {
  render: (args) => (
    <div style={{ width: "200px" }}>
      <Progress {...args} />
    </div>
  ),
  args: {
    percent: 45,
    strokeHeight: 6,
    showText: false,
    theme: "info",
  },
};
