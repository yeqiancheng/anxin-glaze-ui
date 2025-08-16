var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Icon from "../Icon/icon";
import classnames from "classnames";
const Input = (_a) => {
    var { disabled = false, size = "sm", icon, prepend, append, style } = _a, restProps = __rest(_a, ["disabled", "size", "icon", "prepend", "append", "style"]);
    const classes = classnames("viking-input-wrapper", {
        [`input-size-${size}`]: size,
        "is-disabled": disabled,
        "input-group": prepend || append,
        "input-group-append": append,
        "input-group-prepend": prepend,
    });
    const fixControlledValue = (value) => {
        if (typeof value === "undefined" || value === null) {
            return "";
        }
        return value;
    };
    if ("value" in restProps) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(restProps.value);
    }
    return (_jsxs("div", Object.assign({ className: classes, style: style }, { children: [prepend && _jsx("div", Object.assign({ className: "viking-input-group-prepend" }, { children: prepend })), icon && (_jsx("div", Object.assign({ className: "icon-wrapper" }, { children: _jsx(Icon, { icon: icon, title: `title-${icon}` }) }))), _jsx("input", Object.assign({ className: "viking-input-inner", disabled: disabled }, restProps)), append && _jsx("div", Object.assign({ className: "viking-input-group-append" }, { children: append }))] })));
};
export default Input;
