import React from "react";
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
export declare const MenuContext: React.Context<IMenuContext>;
/**
 *
 * @param param0
 * @returns
 */
declare const Menu: ({ defaultIndex, className, mode, style, children, onSelect, defaultOpenSubMenus, }: MenuProps) => import("react/jsx-runtime").JSX.Element;
export default Menu;
