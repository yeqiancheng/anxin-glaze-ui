import React, { ReactElement, InputHTMLAttributes } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Icon from "../Icon/icon";
import classnames from "classnames";
type InputSize = "lg" | "sm";

// Omit忽略某个值，需要忽略size，冲突
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  disabled?: boolean;
  size?: InputSize;
  icon?: IconProp;
  prepend?: string | ReactElement;
  append?: string | ReactElement;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({
  disabled = false,
  size = "sm",
  icon,
  prepend,
  append,
  style,
  ...restProps
}: InputProps) => {
  const classes = classnames("viking-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": append,
    "input-group-prepend": prepend,
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value === null) {
      return "";
    }
    return value;
  };
  if ("value" in restProps) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(restProps.value);
  }
  return (
    <div className={classes} style={style}>
      {prepend && <div className="viking-input-group-prepend">{prepend}</div>}
      {icon && (
        <div className="icon-wrapper">
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input
        className="viking-input-inner"
        disabled={disabled}
        {...restProps}
      />
      {append && <div className="viking-input-group-append">{append}</div>}
    </div>
  );
};

export default Input;
