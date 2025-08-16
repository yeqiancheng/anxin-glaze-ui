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
import { useState, useEffect, useRef } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import useDebounce from "../../hooks/useDebounce";
import Input from "../Input/input";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
library.add(fas);
const AutoComplete = (_a) => {
    var { fetchSuggestions, renderOption, onSelect, value } = _a, restProps = __rest(_a, ["fetchSuggestions", "renderOption", "onSelect", "value"]);
    const [inputValue, setInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const triggerSearch = useRef(false);
    const componentRef = useRef(null);
    useClickOutside(componentRef, () => {
        setSuggestions([]);
    });
    const debouncedValue = useDebounce(inputValue, 500);
    // 监听input值
    useEffect(() => {
        if (debouncedValue && triggerSearch.current) {
            setHighlightIndex(-1);
            const res = fetchSuggestions(debouncedValue);
            setLoading(true);
            if (res instanceof Promise) {
                res.then((data) => {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setLoading(false);
                setSuggestions(res);
            }
        }
        else {
            setLoading(false);
            setSuggestions([]);
        }
    }, [fetchSuggestions, debouncedValue]);
    const renderTemplate = (item) => {
        return renderOption ? renderOption(item) : item.value;
    };
    const highlight = (index) => {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length)
            index = suggestions.length - 1;
        setHighlightIndex(index);
    };
    const handleKeyDown = (e) => {
        switch (e.key) {
            case "Enter":
                suggestions[highlightIndex] &&
                    handleSelect(suggestions[highlightIndex]);
                break;
            case "ArrowUp":
                highlight(highlightIndex - 1);
                break;
            case "ArrowDown":
                highlight(highlightIndex + 1);
                break;
            case "Escape":
                setSuggestions([]);
                break;
            default:
                break;
        }
    };
    const generateDropdown = () => {
        return (_jsx("ul", { children: suggestions.length > 0 &&
                (suggestions === null || suggestions === void 0 ? void 0 : suggestions.map((item, index) => {
                    const cnames = classnames("suggestion-item", {
                        "item-highlighted": index === highlightIndex,
                    });
                    return (_jsx("li", Object.assign({ className: cnames, onClick: () => handleSelect(item) }, { children: renderTemplate(item) }), index));
                })) }));
    };
    const handleSelect = (item) => {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect)
            onSelect(item);
        triggerSearch.current = false;
    };
    const handleChange = (e) => {
        triggerSearch.current = true;
        const value = e.target.value;
        setInputValue(value);
    };
    return (_jsxs("div", Object.assign({ className: "viking-auto-complete", ref: componentRef }, { children: [_jsx(Input, Object.assign({ value: inputValue, onChange: handleChange, onKeyDown: handleKeyDown }, restProps)), loading && (_jsx("ul", { children: _jsx("li", { children: _jsx(Icon, { icon: "spinner", spin: true }) }) })), generateDropdown()] })));
};
export default AutoComplete;
