import React, { ReactNode } from "react";
import { SwitchProps } from "../types/switch";

export const Switch: React.FC<SwitchProps> = ({ children }) => {
  let caseToRender: ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (caseToRender) return;

    const { props } = child;
    if (
      "when" in props &&
      (typeof props.when === "function" ? props.when() : props.when)
    ) {
      caseToRender = child;
      return;
    }
    if (!("when" in props)) caseToRender = child;
  });

  return caseToRender;
};
