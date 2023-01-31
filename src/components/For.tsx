import React from "react";
import { ForProps } from "../types/for";

export const For = <T,>({ each, children }: ForProps<T>) => (
  <>{each.map((value, index) => children(value, index))}</>
);
