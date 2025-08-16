import React, { useState } from "react";
import classnames from "classnames";
import Icon from "../Icon/icon";

interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: React.ReactNode;
}
export default function Dragger(props: DraggerProps) {
  const { onFile, children } = props;
  const [dragOver, setDragOver] = useState(false);
  const klass = classnames("viking-uploader-dragger", {
    "is-dragover": dragOver,
  });

  const handleDrag = (e: React.DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    setDragOver(false);
    onFile(e.dataTransfer.files);
  };

  return (
    <div
      className={klass}
      onDragOver={(e) => handleDrag(e, true)}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      <Icon icon={"cloud-arrow-up"} size={"5x"}></Icon>
      <div>{children}</div>
    </div>
  );
}
