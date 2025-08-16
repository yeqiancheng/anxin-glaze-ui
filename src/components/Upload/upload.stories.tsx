import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Upload, { UploadFile } from "./upload";
import { fn } from "storybook/test";

const meta = {
  title: "Glaze UI组件库/Upload",
  component: Upload,
  parameters: {
    layout: "centered", // 居中
    docs: {
      //   page: mdx, // 使用完整的 MDX 页面
    },
  },
} satisfies Meta<typeof Upload>;
export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleUpload: Story = {
  args: {
    action: "https://jsonplaceholder.typicode.com/posts",
    onProgress: fn(), // 利用fn()来模拟触发事件
    onSuccess: fn(),
    onError: fn(),
    children: "upload",
  },
};

export const DragUpload: Story = {
  args: {
    action: "https://jsonplaceholder.typicode.com/posts",
    onProgress: fn(), // 利用fn()来模拟触发事件
    onSuccess: fn(),
    onError: fn(),
    children: "DragFile upload",
    drag: true,
  },
};

// const checkFileSize = (file: File) => {
//   if (Math.round(file.size / 1024) > 50) {
//     alert("file too big");
//     return false;
//   }
//   return true;
// };

const defaultFileList: UploadFile[] = [
  {
    uid: "123",
    size: 1234,
    name: "hello.md",
    status: "uploading",
    percent: 30,
  },
  {
    uid: "122",
    size: 1234,
    name: "hello.md",
    status: "success",
    percent: 30,
  },
  {
    uid: "121",
    size: 1234,
    name: "hello.md",
    status: "error",
    percent: 30,
  },
];

export const CheckUpload: Story = {
  args: {
    action: "https://jsonplaceholder.typicode.com/posts",
    onChange: fn(),
    // beforeUpload: checkFileSize,
    defaultFileList: defaultFileList,
    children: "upload",
  },
};
