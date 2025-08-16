import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState, useRef } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
const SubMenu = ({ index, title, className, children }) => {
    const context = useContext(MenuContext);
    const nodeRef = useRef(null);
    const openedSubMenus = context.defaultOpenSubMenus;
    const isOpend = index && context.mode === "vertical"
        ? openedSubMenus.includes(index)
        : false;
    const [open, setOpen] = useState(isOpend);
    const classes = classNames("menu-item submenu-item", classNames, {
        "is-active": context.index === index,
        "is-openned": open,
        "is-vertical": context.mode === "vertical",
    });
    const handleClick = () => {
        setOpen(!open);
    };
    let timer;
    const handleMouse = (toggle) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    };
    const clickEvents = context.mode === "vertical"
        ? {
            onClick: handleClick,
        }
        : {};
    const hoverEvents = context.mode !== "vertical"
        ? {
            onMouseEnter: () => {
                handleMouse(true);
            },
            onMouseLeave: () => {
                handleMouse(false);
            },
        }
        : {};
    const renderChildren = () => {
        const subMenuClasses = classNames("submenu", {
            "menu-open": open,
        });
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child;
            if (childElement.type &&
                (childElement === null || childElement === void 0 ? void 0 : childElement.type).displayName === "MenuItem") {
                return React.cloneElement(childElement, { index: `${index}-${i}` });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
        return (_jsx(Transition, Object.assign({ nodeRef: nodeRef, in: open, timeout: 300, animation: "zoom-in-top" }, { children: _jsx("ul", Object.assign({ ref: nodeRef, className: subMenuClasses }, { children: childrenComponent })) })));
    };
    return (_jsxs("li", Object.assign({ className: classes }, hoverEvents, { children: [_jsxs("div", Object.assign({ className: "submenu-title" }, clickEvents, { children: [title, _jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] })), renderChildren()] }), index));
};
SubMenu.displayName = "SubMenu";
export default SubMenu;
