/**
 * React Directive Component
 * @component
 * @param {object} ReactDiretive Component props
 * @param {any} props.children ReactDirective Direct Children
 * @param {boolean} [props.keepDataAttributes=false] Keep data attributes passed to elements or components
 */
import iterations from '../../utils/Iterations';
import conditions from '../../utils/Conditions';

const ReactDirective = ({ children, keepDataAttributes = false }) => {
  if (children) {
    children = Array.isArray(children) ? children : [children];
    //   Loop Stage
    children = children.map(child => iterations(child, keepDataAttributes));
    //    Filter Stage
    children = children
      .map(child => conditions(child, keepDataAttributes))
      .filter(Boolean);
    return children;
  } else return null;
};

export default ReactDirective;
