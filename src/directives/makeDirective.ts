import React from "react";
import { useClassName } from "../hooks/useClassName";
import { DirectiveProps } from "../types/directive";

export const getKey = (
  item: any,
  index: number,
  dirKey?: string | ((currentItem: any) => string | number)
): string | number => {
  if (!(dirKey && item)) return index;
  if (dirKey === "this") return item.toString();
  if (typeof dirKey === "string")
    return (item[dirKey] && item[dirKey].toString()) ?? index;
  if (typeof dirKey === "function") return dirKey(item);
  return index;
};

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
    dirKey,
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
                ...extraProps,
                key: getKey(item, i, dirKey),
              },
              typeof children === "function"
                ? children(item, i)
                : (children as React.ReactNode)
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
