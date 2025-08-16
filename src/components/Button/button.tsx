import React from "react";
import classNames from "classnames";
type ButtonSize = "lg" | "sm";
type ButtonType = "primary" | "default" | "danger" | "link";

interface BaseButtonProps {
  /** 自定义class */
  className?: string;
  /** 按钮类型 */
  btnType?: ButtonType;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 禁用状态 */
  disabled?: boolean;
  /** 链接地址（Link 类型专用） */
  href?: string;
  /** 子元素 */
  children: React.ReactNode;
}

// 需要有原生事件
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.LinkHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button = ({
  disabled = false,
  className,
  size = "sm",
  btnType = "default",
  children,
  href,
  ...restProps // 将除了上述的变量都取出来
}: ButtonProps) => {
  //btn,btn-lg,btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "default" && disabled,
  });

  // Link类型，href用于链接
  if (btnType === "link" && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    // Button类型
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

export default Button;
