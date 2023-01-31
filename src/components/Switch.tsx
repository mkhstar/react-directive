import React, { ReactNode } from "react";
import { CaseProps, DefaultProps, SwitchProps } from "../types/switch";

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

export const Case = ({ when, children }: CaseProps) => {
  return when ? children : null;
};

export const Default = ({ children }: DefaultProps) => children;
