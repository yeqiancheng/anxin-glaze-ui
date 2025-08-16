import React from "react";
export type UploadFileStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}
export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    onProgress?: (percentage: number, file: File) => void;
    /** 成功回调 */
    onSuccess?: (data: any, file: File) => void;
    /** 失败回调 */
    onError?: (err: any, file: File) => void;
    /** 上传文件之前处理 */
    beforeUpload?: (file: File) => boolean | Promise<File>;
    /** 文件修改回调 */
    onChange?: (file: File) => void;
    /** 移除事件 */
    onRemove?: (file: UploadFile) => void;
    headers?: {
        [key: string]: any;
    };
    /** 文件上传时key的名称 */
    name?: string;
    /** 需要携带的其余参数 */
    data?: {
        [key: string]: any;
    };
    /** 发送是否携带cookie */
    withCredentials?: boolean;
    /** 接收类型 */
    accept?: string;
    /** 是否多文件 */
    multiple?: boolean;
    children?: React.ReactNode;
    /** 拖动上传 */
    drag?: boolean;
}
declare const Upload: ({ action, defaultFileList, onProgress, onSuccess, onError, beforeUpload, onChange, onRemove, headers, name, data, withCredentials, accept, multiple, children, drag, }: UploadProps) => import("react/jsx-runtime").JSX.Element;
export default Upload;
