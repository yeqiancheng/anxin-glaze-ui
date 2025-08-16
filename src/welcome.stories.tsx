import type { Meta } from "@storybook/react-webpack5";
import mdx from "./welcome.mdx";

const meta = {
  title: "Glaze UI组件库/Welcome",
  parameters: {
    layout: "fullscreen",
    docs: {
      page: mdx,
    },
  },
} satisfies Meta;

export default meta;

// 导出一个空的Story来满足Storybook要求
export const Welcome: any = {
  parameters: {
    docs: {
      disable: true, // 禁用这个Story的文档生成
    },
  },
  render: () => null, // 空渲染
};
