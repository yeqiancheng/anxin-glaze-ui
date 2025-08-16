import classNames from "classnames";
import React, { createContext, useState } from "react";
import { MenuItemProps } from "./menuItem";
type MenuMode = "horizontal" | "vertical";

type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /** 默认选中的菜单项索引 */
  defaultIndex?: string;
  /** 自定义 CSS 类名 */
  className?: string;
  /** 菜单布局模式：水平(horizontal) 或 垂直(vertical) */
  mode?: MenuMode;
  /** 自定义内联样式 */
  style?: React.CSSProperties;
  /** 菜单项被选中时的回调函数 */
  onSelect?: SelectCallback;
  /** 菜单子元素 */
  children?: React.ReactNode;
  /** 默认展开的子菜单索引数组 */
  defaultOpenSubMenus?: string[];
}

interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ index: "0" });

/**
 *
 * @param param0
 * @returns
 */
const Menu = ({
  defaultIndex = "0",
  className,
  mode = "horizontal",
  style,
  children,
  onSelect,
  defaultOpenSubMenus = [],
}: MenuProps) => {
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames("menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  // 不仅要onSelect还要变化active
  const handleClick = (index: string) => {
    setActive(index);
    onSelect && onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  // 渲染children，保证子组件是MenuItem
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.ReactElement<MenuItemProps>;
      const displayName =
        childElement.type && (childElement.type as any).displayName;
      if (displayName === "MenuItem" || displayName === "SubMenu")
        return React.cloneElement(childElement, { index: index.toString() }); // clone子组件，设置index
      console.error(
        "Warning: Menu has a child which is not a MenuItem component"
      );
    });
  };

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

export default Menu;
