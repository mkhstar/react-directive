const condition = (child, keepDataAttributes) => {
  if (Array.isArray(child)) {
    return child.map(c => condition(c));
  }
  if (child.props && child.props.hasOwnProperty('data-react-if')) {
    if (Boolean(child.props['data-react-if']) === false) {
      return null;
    }
    if (child.props.children) child = getChildren(child, keepDataAttributes);
  } else if (child.props && child.props.children) {
    child = getChildren(child, keepDataAttributes);
  }
  return child;
};

const getChildren = (child, keepDataAttributes) => {
  let { children } = child.props;
  if (Array.isArray(children)) {
    children = children
      .map(innerChild => condition(innerChild))
      .filter(Boolean);
  } else {
    children = condition(children);
  }
  child = {
    ...child,
    props: {
      ...child.props,
      'data-react-if':
        child.props['data-react-if'] && keepDataAttributes
          ? child.props['data-react-if']
          : undefined,
      children
    }
  };
  return child;
};

export default condition;
