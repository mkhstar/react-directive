import React from "react";
import { ForProps } from "../types/for";

export class For<T> extends React.Component<ForProps<T>> {
  render() {
    return this.props.each.map((value, index) =>
      this.props.children(value, index)
    );
  }
}
