import React, { ReactElement, InputHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
type InputSize = "lg" | "sm";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
    disabled?: boolean;
    size?: InputSize;
    icon?: IconProp;
    prepend?: string | ReactElement;
    append?: string | ReactElement;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
declare const Input: ({ disabled, size, icon, prepend, append, style, ...restProps }: InputProps) => import("react/jsx-runtime").JSX.Element;
export default Input;
