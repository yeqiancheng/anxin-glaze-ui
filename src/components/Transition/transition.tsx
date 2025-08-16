import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName =
  | "zoom-in-top"
  | "zoom-in-left"
  | "zoom-in-bottom"
  | "zoom-in-right";
type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
  wrapper?: boolean;
};

const Transition = ({
  animation,
  children,
  wrapper = false,
  classNames,
  unmountOnExit = true,
  appear = true,
  ...restProps
}: TransitionProps) => {
  const classNameProp = classNames ? classNames : animation;

  if (typeof children === "function") {
    return (
      <CSSTransition
        classNames={classNameProp}
        unmountOnExit={unmountOnExit}
        appear={appear}
        {...restProps}
      >
        {children as any}
      </CSSTransition>
    );
  }

  const content = wrapper ? <div>{children}</div> : children;
  return (
    <CSSTransition
      classNames={classNameProp}
      unmountOnExit={unmountOnExit}
      appear={appear}
      {...restProps}
    >
      {content}
    </CSSTransition>
  );
};

export default Transition;
