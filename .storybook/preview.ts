import type { Preview } from "@storybook/react-webpack5";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "../src/styles/index.scss";
library.add(fas);

const preview: Preview = {
  tags: ["autodocs"], // 启用文档
  parameters: {
    options: {
      storySort: {
        order: ["welcome", "*"], // welcome 排在最前
      },
      initialStory: "welcome", // 设置初始故事
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
