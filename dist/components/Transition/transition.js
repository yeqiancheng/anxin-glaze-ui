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
import { CSSTransition } from "react-transition-group";
const Transition = (_a) => {
    var { animation, children, wrapper = false, classNames, unmountOnExit = true, appear = true } = _a, restProps = __rest(_a, ["animation", "children", "wrapper", "classNames", "unmountOnExit", "appear"]);
    const classNameProp = classNames ? classNames : animation;
    if (typeof children === "function") {
        return (_jsx(CSSTransition, Object.assign({ classNames: classNameProp, unmountOnExit: unmountOnExit, appear: appear }, restProps, { children: children })));
    }
    const content = wrapper ? _jsx("div", { children: children }) : children;
    return (_jsx(CSSTransition, Object.assign({ classNames: classNameProp, unmountOnExit: unmountOnExit, appear: appear }, restProps, { children: content })));
};
export default Transition;
