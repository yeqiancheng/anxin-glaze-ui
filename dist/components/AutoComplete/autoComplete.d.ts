/// <reference types="react" />
import { InputProps } from "../Input/input";
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps<T> extends Omit<InputProps, "onSelect"> {
    /** 过滤事件 */
    fetchSuggestions: (str: string) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>;
    /** 自定义点击事件 */
    onSelect?: (item: DataSourceType<T>) => void;
    /** 自定义渲染模板 */
    renderOption?: (item: DataSourceType<T>) => React.ReactNode;
}
declare const AutoComplete: <T extends {} = {}>({ fetchSuggestions, renderOption, onSelect, value, ...restProps }: AutoCompleteProps<T>) => import("react/jsx-runtime").JSX.Element;
export default AutoComplete;
