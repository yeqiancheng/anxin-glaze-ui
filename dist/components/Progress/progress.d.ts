import React from "react";
import { ThemeProps } from "../Icon/icon";
export interface ProgressProps {
    percent: number;
    strokeHeight?: number;
    showText?: boolean;
    style?: React.CSSProperties;
    theme?: ThemeProps;
}
declare const Progress: ({ percent, strokeHeight, showText, style, theme, }: ProgressProps) => import("react/jsx-runtime").JSX.Element;
export default Progress;
