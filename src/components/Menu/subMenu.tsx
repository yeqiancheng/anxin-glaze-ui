import React, { useContext, useState, useRef } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

const SubMenu = ({ index, title, className, children }: SubMenuProps) => {
  const context = useContext(MenuContext);
  const nodeRef = useRef(null);
  const openedSubMenus = context.defaultOpenSubMenus as string[];
  const isOpend =
    index && context.mode === "vertical"
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

  let timer: any;
  const handleMouse = (toggle: boolean) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode !== "vertical"
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
      const childElement = child as React.ReactElement<MenuItemProps>;
      if (
        childElement.type &&
        (childElement?.type as any).displayName === "MenuItem"
      ) {
        return React.cloneElement(childElement, { index: `${index}-${i}` });
      } else {
        console.error(
          "Warning: Menu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition
        nodeRef={nodeRef}
        in={open}
        timeout={300}
        animation="zoom-in-top"
      >
        <ul ref={nodeRef} className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon icon={"angle-down"} className="arrow-icon"></Icon>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";

export default SubMenu;
