import { jsx as _jsx } from "react/jsx-runtime";
const Progress = ({ percent, strokeHeight = 15, showText = true, style, theme = "primary", }) => {
    return (_jsx("div", Object.assign({ className: "viking-progress-bar", style: style }, { children: _jsx("div", Object.assign({ className: "viking-progress-bar-outer", style: { height: `${strokeHeight}px` } }, { children: _jsx("div", Object.assign({ className: `viking-progress-bar-inner color-${theme}`, style: { width: `${percent}%` } }, { children: showText && _jsx("span", Object.assign({ className: "inner-text" }, { children: `${percent}%` })) })) })) })));
};
export default Progress;
