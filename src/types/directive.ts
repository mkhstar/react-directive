import React from "react";
import { makeDirective } from "../directives/makeDirective";
import { Classes, ClassesDependencies } from "./classes";

export type Mapper<T> = (currentItem: T, index: number) => React.ReactNode;

export type DirectiveChildren<T> = Mapper<T> | React.ReactNode;

export interface DirectiveProps<T = undefined, E = undefined> {
  dirIf?: any;
  dirShow?: any;
  className?: Classes;
  classNameDeps?: ClassesDependencies;
  dirFor?: Array<T>;
  dirRef?: React.Ref<
    E extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[E] : any
  >;
  children?: T extends undefined ? React.ReactNode : DirectiveChildren<T>;
  dirKey?: T extends undefined
    ? never
    : string | ((currentItem: T) => string | number);
}

export type DirectiveMap = {
  [Key in keyof JSX.IntrinsicElements]: ReturnType<typeof makeDirective<Key>>;
};
