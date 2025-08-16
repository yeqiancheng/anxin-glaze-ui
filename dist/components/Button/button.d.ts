import React from "react";
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
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & React.LinkHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
declare const Button: ({ disabled, className, size, btnType, children, href, ...restProps }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
export default Button;
