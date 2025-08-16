import { useState, ChangeEvent, useEffect, KeyboardEvent, useRef } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import useDebounce from "../../hooks/useDebounce";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icon/icon";
import useClickOutside from "../../hooks/useClickOutside";
library.add(fas);

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps<T> extends Omit<InputProps, "onSelect"> {
  /** 过滤事件 */
  fetchSuggestions: (
    str: string
  ) => DataSourceType<T>[] | Promise<DataSourceType<T>[]>;
  /** 自定义点击事件 */
  onSelect?: (item: DataSourceType<T>) => void;
  /** 自定义渲染模板 */
  renderOption?: (item: DataSourceType<T>) => React.ReactNode;
}

const AutoComplete = <T extends {} = {}>({
  fetchSuggestions,
  renderOption,
  onSelect,
  value,
  ...restProps
}: AutoCompleteProps<T>) => {
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType<T>[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);

  const componentRef = useRef<HTMLDivElement>(null);
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
      } else {
        setLoading(false);
        setSuggestions(res);
      }
    } else {
      setLoading(false);
      setSuggestions([]);
    }
  }, [fetchSuggestions, debouncedValue]);

  const renderTemplate = (item: DataSourceType<T>) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) index = suggestions.length - 1;
    setHighlightIndex(index);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
    return (
      <ul>
        {suggestions.length > 0 &&
          suggestions?.map((item, index) => {
            const cnames = classnames("suggestion-item", {
              "item-highlighted": index === highlightIndex,
            });
            return (
              <li
                className={cnames}
                key={index}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
      </ul>
    );
  };

  const handleSelect = (item: DataSourceType<T>) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) onSelect(item);
    triggerSearch.current = false;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    triggerSearch.current = true;
    const value = e.target.value;
    setInputValue(value);
  };

  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {loading && (
        <ul>
          <li>
            <Icon icon="spinner" spin />
          </li>
        </ul>
      )}
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
