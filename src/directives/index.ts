import { DirectiveMap } from "../types/directive";
import { elements } from "./elements";
import { makeDirective } from "./makeDirective";

const directive = {} as DirectiveMap;

elements.forEach((element) => {
  directive[element] = makeDirective(element);
});

export default directive;
