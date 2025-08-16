import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { useState } from "react";
import Input from "./input";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Glaze UI组件库/Input",
  component: Input,
  parameters: {
    layout: "centered", // 居中
  },
} satisfies Meta<typeof Input>;
export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  render: (args) => <Input {...args}></Input>,
  args: {
    placeholder: "请输入内容...",
    size: "sm",
  },
};

export const BigInput: Story = {
  render: (args) => <Input {...args}></Input>,
  args: {
    placeholder: "请输入内容...",
    size: "lg",
  },
};

export const ControlledInput: Story = {
  render: () => <ControlledInputComponent />,
};

// 创建一个使用 Hook 的组件
const ControlledInputComponent = (args: any) => {
  const [value, setValue] = useState("");
  return (
    <Input
      {...args}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="请输入内容..."
    />
  );
};
