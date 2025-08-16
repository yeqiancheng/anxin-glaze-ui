import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";
export default function Dragger(props) {
    const { onFile, children } = props;
    const [dragOver, setDragOver] = useState(false);
    const klass = classnames("viking-uploader-dragger", {
        "is-dragover": dragOver,
    });
    const handleDrag = (e, over) => {
        e.preventDefault();
        setDragOver(over);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        onFile(e.dataTransfer.files);
    };
    return (_jsxs("div", Object.assign({ className: klass, onDragOver: (e) => handleDrag(e, true), onDragLeave: (e) => {
            handleDrag(e, false);
        }, onDrop: handleDrop }, { children: [_jsx(Icon, { icon: "cloud-arrow-up", size: "5x" }), _jsx("div", { children: children })] })));
}
