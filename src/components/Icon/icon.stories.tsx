import type { Meta, StoryObj } from "@storybook/react-webpack5";
// 一次性添加所有图标
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Icon, { IconProps } from "./icon";
import mdx from "./icon.mdx";

library.add(fas);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Glaze UI组件库/Icon",
  component: Icon,
  parameters: {
    layout: "centered", // 居中
    docs: {
      page: mdx, // 使用完整的 MDX 页面
    },
  },
} satisfies Meta<typeof Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const PrimaryCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "primary",
  },
} as any;

export const SecondaryCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "secondary",
  },
} as any;

export const SuccessCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "success",
  },
} as any;

export const InfoCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "info",
  },
} as any;

export const WarningCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "warning",
  },
} as any;

export const DangerCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "danger",
  },
} as any;

export const LightCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "light",
  },
} as any;

export const DarkCoffee: Story = {
  render: (args: IconProps) => <Icon {...args} />,
  args: {
    icon: "coffee",
    theme: "dark",
  },
} as any;
