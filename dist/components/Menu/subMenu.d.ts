import React from "react";
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: React.ReactNode;
}
declare const SubMenu: {
    ({ index, title, className, children }: SubMenuProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
export default SubMenu;
