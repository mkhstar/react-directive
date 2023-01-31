import React from "react";
import { useClassName } from "../hooks/useClassName";
import { DirectiveProps } from "../types/directive";

export const makeDirective = <T extends keyof JSX.IntrinsicElements>(
  component: T
) => {
  type DirectivePropsWithValue<Value = undefined> = DirectiveProps<Value, T> &
    Omit<JSX.IntrinsicElements[T], "children" | "className">;

  const DirectiveComponent = <Value = undefined>({
    dirIf = true,
    dirShow = true,
    classNameDeps,
    dirFor,
    children,
    style,
    dirRef,
    className,
    ...props
  }: DirectivePropsWithValue<Value>): React.ReactElement | null => {
    const classString = useClassName(className, classNameDeps);

    if (!dirIf) return null;

    const extraProps: Record<string, any> = {
      style:
        style || !dirShow
          ? { ...style, display: !dirShow ? "none" : style && style.display }
          : undefined,
      className: classString || undefined,
    };

    return dirFor
      ? React.createElement(
          React.Fragment,
          null,
          dirFor.map((item, i) =>
            React.createElement(
              component,
              {
                ...props,
                key: props.keyExtractor ? props.keyExtractor(item) : i,
              },
              typeof children === "function" ? children(item, i) : children
            )
          )
        )
      : React.createElement(
          component,
          { ...props, ...extraProps, ref: dirRef },
          children as React.ReactNode
        );
  };

  return DirectiveComponent;
};
