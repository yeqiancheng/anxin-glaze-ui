import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import Button from "../Button/button";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
const Upload = ({ action, defaultFileList, onProgress, onSuccess, onError, beforeUpload, onChange, onRemove, headers, name = "file", data, withCredentials, accept, multiple, children, drag = false, }) => {
    const fileInput = useRef(null);
    const [fileList, setFileList] = useState(defaultFileList || []);
    const updateFileList = (updateFile, updateObj) => {
        setFileList((prevList) => {
            return prevList.map((file) => {
                if (file.uid === updateFile.uid) {
                    return Object.assign(Object.assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    const handleFileChange = (e) => {
        const files = e.target.files;
        if (!files)
            return;
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = "";
        }
    };
    const uploadFiles = (files) => {
        const postFiles = Array.from(files);
        postFiles.forEach((file) => {
            if (!beforeUpload) {
                post(file);
            }
            else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then((processedFile) => {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    const handleRemove = (_file) => {
        setFileList((prevList) => {
            return prevList.filter((item) => item.uid !== _file.uid);
        });
        if (onRemove) {
            onRemove(_file);
        }
    };
    const post = (file) => {
        let _file = {
            uid: Date.now() + "upload-file",
            status: "ready",
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        setFileList((prevList) => {
            return [_file, ...prevList];
        });
        const formData = new FormData();
        formData.append(name, file);
        if (data) {
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: Object.assign(Object.assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials,
            // 自带的上传进度
            onUploadProgress: (e) => {
                const percentage = Math.floor(e.progress * 100);
                // 由于useState是异步操作，不能直接操作，利用setState来实现
                // 其次需要返回新的列表，官网会通过Object.is来对比
                updateFileList(_file, { percent: percentage, status: "uploading" });
                if (percentage < 100) {
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then((res) => {
            // 上传完成后更新
            updateFileList(_file, { status: "success", response: res.data });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch((err) => {
            updateFileList(_file, { status: "error", error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (_jsxs("div", Object.assign({ className: "viking-upload-component" }, { children: [!drag ? (_jsx(Button, Object.assign({ btnType: "primary", onClick: handleClick }, { children: children }))) : (_jsx("div", Object.assign({ className: "viking-upload-input", style: { display: "inline-block" }, onClick: handleClick }, { children: _jsx(Dragger, Object.assign({ onFile: (files) => {
                        uploadFiles(files);
                    } }, { children: children })) }))), _jsx("input", { className: "viking-file-input", style: { display: "none" }, onChange: handleFileChange, ref: fileInput, type: "file", accept: accept, multiple: multiple }), _jsx(UploadList, { fileList: fileList, onRemove: handleRemove })] })));
};
export default Upload;
