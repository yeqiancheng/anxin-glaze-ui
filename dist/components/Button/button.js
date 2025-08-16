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
import { jsx as _jsx } from "react/jsx-runtime";
import classNames from "classnames";
const Button = (_a) => {
    var { disabled = false, className, size = "sm", btnType = "default", children, href } = _a, restProps = __rest(_a, ["disabled", "className", "size", "btnType", "children", "href"]) // 将除了上述的变量都取出来
    ;
    //btn,btn-lg,btn-primary
    const classes = classNames("btn", className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        disabled: btnType === "default" && disabled,
    });
    // Link类型，href用于链接
    if (btnType === "link" && href) {
        return (_jsx("a", Object.assign({ href: href, className: classes }, restProps, { children: children })));
    }
    else {
        // Button类型
        return (_jsx("button", Object.assign({ className: classes, disabled: disabled }, restProps, { children: children })));
    }
};
export default Button;
