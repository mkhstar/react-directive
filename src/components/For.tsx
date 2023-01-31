import React from "react";
import { ForProps } from "../types/for";

const For = <T,>({ each, children }: ForProps<T>) => (
  <>{each.map((value, index) => children(value, index))}</>
);

export default For;
