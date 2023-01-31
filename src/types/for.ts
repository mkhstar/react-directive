import React from "react";

export interface ForProps<T> {
  each: T[];
  children: (value: T, index: number) => React.ReactNode;
}
