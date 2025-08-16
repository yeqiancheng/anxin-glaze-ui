import React from "react";
export interface MenuItemProps {
    index?: string;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}
declare const MenuItem: {
    ({ index, disabled, className, style, children, }: MenuItemProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default MenuItem;
