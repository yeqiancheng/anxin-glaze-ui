import React, { ChangeEvent, useRef, useState } from "react";
import Button from "../Button/button";
import axios from "axios";
import UploadList from "./uploadList";
import Dragger from "./dragger";
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
  headers?: { [key: string]: any };
  /** 文件上传时key的名称 */
  name?: string;
  /** 需要携带的其余参数 */
  data?: { [key: string]: any };
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

const Upload = ({
  action,
  defaultFileList,
  onProgress,
  onSuccess,
  onError,
  beforeUpload,
  onChange,
  onRemove,
  headers,
  name = "file",
  data,
  withCredentials,
  accept,
  multiple,
  children,
  drag = false,
}: UploadProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile>
  ) => {
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const uploadFiles = (files: FileList) => {
    const postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };

  const handleRemove = (_file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== _file.uid);
    });
    if (onRemove) {
      onRemove(_file);
    }
  };

  const post = (file: File) => {
    let _file: UploadFile = {
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
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        // 自带的上传进度
        onUploadProgress: (e: any) => {
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

  return (
    <div className="viking-upload-component">
      {!drag ? (
        <Button btnType="primary" onClick={handleClick}>
          {children}
        </Button>
      ) : (
        <div
          className="viking-upload-input"
          style={{ display: "inline-block" }}
          onClick={handleClick}
        >
          <Dragger
            onFile={(files) => {
              uploadFiles(files);
            }}
          >
            {children}
          </Dragger>
        </div>
      )}

      <input
        className="viking-file-input"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInput}
        type="file"
        accept={accept}
        multiple={multiple}
      ></input>
      <UploadList fileList={fileList} onRemove={handleRemove}></UploadList>
    </div>
  );
};

export default Upload;
