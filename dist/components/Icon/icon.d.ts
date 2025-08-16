import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
export type ThemeProps = "primary" | "secondary" | "success" | "info" | "warning" | "danger" | "light" | "dark";
export interface IconProps extends FontAwesomeIconProps {
    /** 主题 */
    theme?: ThemeProps;
}
declare const Icon: ({ theme, className, ...restProps }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default Icon;
