import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
library.add(fas);

const testProps: MenuProps = {
  defaultIndex: "0",
  mode: "horizontal",
  onSelect: jest.fn(),
  className: "test",
  defaultOpenSubMenus: [],
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

// 公共函数：渲染菜单并返回所有元素
const renderMenuAndGetElements = (props: MenuProps) => {
  render(generateMenu(props));
  // 使用 Testing Library 推荐的方法
  const menuElement = screen.getByRole("list");
  const menuItems = screen.getAllByRole("listitem");
  const activeElement = menuItems[0];
  const disabledElement = menuItems[1];
  const normalElement = menuItems[2];

  return {
    menuElement,
    menuItems,
    activeElement,
    disabledElement,
    normalElement,
  };
};

describe("test Menu and MenuItem component", () => {
  test("should render correct Menu and MenuItem based on default props", () => {
    const {
      menuElement,
      menuItems,
      activeElement,
      disabledElement,
      normalElement,
    } = renderMenuAndGetElements(testProps);

    // 验证元素存在
    expect(menuElement).toBeInTheDocument();
    expect(menuItems).toHaveLength(4);
    expect(activeElement).toBeInTheDocument();
    expect(disabledElement).toBeInTheDocument();
    expect(normalElement).toBeInTheDocument();

    // 验证CSS类名
    expect(menuElement).toHaveClass("test", "menu");
    expect(activeElement).toHaveClass("menu-item", "menu-item-active");
    expect(disabledElement).toHaveClass("menu-item", "menu-item-disabled");
  });

  test("click items should change active and call the right callback", () => {
    const { normalElement, disabledElement } =
      renderMenuAndGetElements(testProps);

    // 点击第三个item
    fireEvent.click(normalElement);
    expect(testProps.onSelect).toHaveBeenCalledWith("2"); // 2是函数的入参
    expect(normalElement).toHaveClass("menu-item-active");

    // 尝试点击被禁用的item，应该不会触发回调
    fireEvent.click(disabledElement);
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1"); // 1是函数的入参
  });

  test("shuold render vertical mode when mode is set to vertical", () => {
    const { menuElement } = renderMenuAndGetElements(testVerProps);

    expect(menuElement).toHaveClass("menu-vertical");
  });

  // test("should show dropdown items when hover on subMenu", () => {
  //   renderMenuAndGetElements(testProps);
  //   // 初始状态下，检查元素存在但不可见
  //   const initialDrop = screen.queryByText("drop1");
  //   expect(initialDrop).toBeInTheDocument(); // 确保元素存在
  //   expect(initialDrop).not.toBeVisible(); // 但不可见

  //   // 悬停在 SubMenu 上
  //   const subMenuElement = screen.getByText("dropdown");
  //   fireEvent.mouseEnter(subMenuElement);

  //   // 悬停后，检查元素可见
  //   const dropElement = screen.getByText("drop1");
  //   expect(dropElement).toBeVisible();
  // });
});
