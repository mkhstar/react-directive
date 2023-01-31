import { ReactElement } from "react";

export interface CaseProps {
  when: any | (() => any);
  children: JSX.Element;
}

export interface DefaultProps {
  children: JSX.Element;
}

type SwitchChildrenProps = CaseProps | DefaultProps;

export interface SwitchProps {
  children:
    | ReactElement<SwitchChildrenProps>
    | ReactElement<SwitchChildrenProps>[];
}
