import React from "react";
import { DefaultProps } from "../types/switch";

export class Default extends React.Component<DefaultProps> {
  render() {
    return this.props.children;
  }
}
