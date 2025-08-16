import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
const MenuItem = ({ index, disabled = false, className, style, children, }) => {
    const context = useContext(MenuContext);
    const classes = classNames("menu-item", className, {
        "menu-item-disabled": disabled,
        "menu-item-active": context.index === index,
    });
    const handleClick = () => {
        if (context.onSelect && !disabled && typeof index === "string") {
            context.onSelect(index);
        }
    };
    return (_jsx("li", Object.assign({ className: classes, style: style, onClick: handleClick }, { children: children })));
};
MenuItem.displayName = "MenuItem";
export default MenuItem;
