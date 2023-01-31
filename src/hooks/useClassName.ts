import { useCallback, useEffect, useRef, useState } from "react";
import { Classes, ClassesDependencies } from "../types/classes";

export const useClassName = (classes?: Classes, deps?: ClassesDependencies) => {
  const dependencies = deps || [classes];

  const isMounted = useRef(false);

  const getNames = useCallback((receivedClasses = classes): string => {
    if (!receivedClasses) return "";
    if (typeof receivedClasses === "string") return receivedClasses;
    if (Array.isArray(receivedClasses)) {
      return receivedClasses
        .map((value) => (typeof value === "string" ? value : getNames(value)))
        .join(" ");
    }
    return Object.keys(receivedClasses).reduce((acc, v) => {
      if (!receivedClasses[v]) return acc;

      return acc ? `${acc} ${v}` : v;
    }, "");
  }, []);

  const [classNames, setClassNames] = useState(getNames);

  useEffect(() => {
    if (isMounted.current === false) {
      // We don't need to recalculate on the first render because useState will do it.
      isMounted.current = true;
      return;
    }
    setClassNames(getNames(classes));
  }, dependencies);

  return classNames;
};
