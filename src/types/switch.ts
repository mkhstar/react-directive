import React, { ReactElement } from "react";

export interface CaseProps {
  when: any | (() => any);
  children: React.ReactNode;
}

export interface DefaultProps {
  children: React.ReactNode;
}

type SwitchChildrenProps = CaseProps | DefaultProps;

export interface SwitchProps {
  children:
    | ReactElement<SwitchChildrenProps>
    | ReactElement<SwitchChildrenProps>[];
}
