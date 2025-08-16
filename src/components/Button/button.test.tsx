import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "sm",
  className: "klass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

describe("test Button component", () => {
  test("should render the correct default button", () => {
    render(<Button {...defaultProps}>Nice</Button>); // 渲染到页面上
    const buttonElement = screen.getByRole("button", { name: "Nice" }); // 是语义化的，button、link、generic
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toEqual("BUTTON"); // 判断是否是BUTTON标签，要大写
    expect(buttonElement).toHaveClass("btn btn-default"); // 判断class
    fireEvent.click(buttonElement); // 模拟点击
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  test("should render the correct component based on different props", () => {
    render(<Button {...testProps}>Nice</Button>); // 渲染到页面上
    const buttonElement = screen.getByRole("button", {
      name: /Nice/i,
    }) as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.disabled).toBeFalsy();
    expect(buttonElement).toHaveClass("btn klass btn-primary btn-sm");
  });
  test("should render a link when btnType equals link and href is provided", () => {
    render(
      <Button btnType={"link"} href="#test">
        Link
      </Button>
    ); // 渲染到页面上
    const buttonElement = screen.getByText("Link");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.tagName).toEqual("A"); // 判断是否是BUTTON标签，要大写
    expect(buttonElement).toHaveClass("btn btn-link");
  });
  test("should render disabled button when disabled set to true", () => {
    render(<Button {...disabledProps}>disabled</Button>); // 渲染到页面上
    const buttonElement = screen.getByRole("button", {
      name: "disabled",
    }) as HTMLButtonElement;
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.disabled).toBeTruthy();
    fireEvent.click(buttonElement);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
