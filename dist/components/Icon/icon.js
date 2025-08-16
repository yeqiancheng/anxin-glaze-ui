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
import { FontAwesomeIcon, } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
const Icon = (_a) => {
    var { theme, className } = _a, restProps = __rest(_a, ["theme", "className"]);
    const classes = classNames("viking-icon", className, {
        [`icon-${theme}`]: theme,
    });
    return _jsx(FontAwesomeIcon, Object.assign({ className: classes }, restProps));
};
export default Icon;
