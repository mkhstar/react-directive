import { makeDirective } from "../directives/makeDirective";
import { Classes, ClassesDependencies } from "./classes";

export type DirectiveChildren<T> =
  | ((currentItem: T, index: number) => React.ReactNode)
  | React.ReactNode;

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
  keyExtractor?: T extends undefined
    ? never
    : (currentItem: T) => string | number | null;
}

export type DirectiveMap = {
  [Key in keyof JSX.IntrinsicElements]: ReturnType<typeof makeDirective<Key>>;
};
