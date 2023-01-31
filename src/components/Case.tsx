import React from "react";
import { CaseProps } from "../types/switch";

export class Case extends React.Component<CaseProps> {
  render() {
    const { when, children } = this.props;
    return when ? children : null;
  }
}
