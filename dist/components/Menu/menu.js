import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
import React, { createContext, useState } from "react";
export const MenuContext = createContext({ index: "0" });
/**
 *
 * @param param0
 * @returns
 */
const Menu = ({ defaultIndex = "0", className, mode = "horizontal", style, children, onSelect, defaultOpenSubMenus = [], }) => {
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames("menu", className, {
        "menu-vertical": mode === "vertical",
        "menu-horizontal": mode !== "vertical",
    });
    // 不仅要onSelect还要变化active
    const handleClick = (index) => {
        setActive(index);
        onSelect && onSelect(index);
    };
    const passedContext = {
        index: currentActive ? currentActive : "0",
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    };
    // 渲染children，保证子组件是MenuItem
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child;
            const displayName = childElement.type && childElement.type.displayName;
            if (displayName === "MenuItem" || displayName === "SubMenu")
                return React.cloneElement(childElement, { index: index.toString() }); // clone子组件，设置index
            console.error("Warning: Menu has a child which is not a MenuItem component");
        });
    };
    return (_jsx("ul", Object.assign({ className: classes, style: style }, { children: _jsx(MenuContext.Provider, Object.assign({ value: passedContext }, { children: renderChildren() })) })));
};
export default Menu;
