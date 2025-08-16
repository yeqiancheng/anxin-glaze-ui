import type { Meta, StoryObj } from "@storybook/react-webpack5";
import AutoComplete, { DataSourceType } from "./autoComplete";
import mdx from "./autoComplete.mdx";
// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Glaze UI组件库/AutoComplete",
  component: AutoComplete,
  parameters: {
    layout: "centered", // 居中
    docs: {
      page: mdx,
    },
  },
} satisfies Meta<typeof AutoComplete>;
export default meta;
type Story = StoryObj<typeof meta>;

const DefaultAutoCompleteComponent = (args: any) => {
  // const lakers = [
  //   "bradley",
  //   "pope",
  //   "caruso",
  //   "cook",
  //   "cousins",
  //   "james",
  //   "AD",
  //   "green",
  //   "howard",
  // ];
  interface lakersWithNumberProps {
    value: string;
    number: number;
  }

  // const lakersWithNumber = [
  //   { value: "bradley", number: 11 },
  //   { value: "pop", number: 10 },
  //   { value: "caruso", number: 1 },
  //   { value: "cook", number: 2 },
  //   { value: "james", number: 5 },
  //   { value: "AD", number: 7 },
  //   { value: "green", number: 37 },
  //   { value: "howard", number: 0 },
  // ];

  const renderOption = (item: DataSourceType<lakersWithNumberProps>) => {
    return (
      <h2>
        Name:{item.value},Number:{item.number}
      </h2>
    );
  };

  // const handleFetch = (value: string) => {
  //   return lakers.filter((item) => item.includes(value));
  // };

  // const handleFetch = (value: string) => {
  //   return lakersWithNumber.filter((item) => item.value.includes(value));
  // };

  const handleFetch = (value: string) => {
    return fetch(`https://api.github.com/search/users?q=${value}`)
      .then((res) => res.json())
      .then(({ items }) => {
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const handleSelect = (item: DataSourceType) => {
    console.log(item);
  };

  return (
    <AutoComplete
      renderOption={renderOption}
      fetchSuggestions={handleFetch}
      onSelect={handleSelect}
    />
  );
};

export const Default: Story = {
  render: (args: any) => <DefaultAutoCompleteComponent {...args} />,
} as any;
