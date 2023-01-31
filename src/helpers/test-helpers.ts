import { ReactElement } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import renderer from "react-test-renderer";

export const snapshotTest = (
  render: ReactElement<any, string>,
  title?: string
) => {
  const tree = renderer.create(render).toJSON();
  expect(tree).toMatchSnapshot(title || "");
};

export const truthyValues = ["value", true, 1, Infinity, -1, -Infinity, {}, []];
export const falsyValues = ["", false, 0, null];
export const truthyFalsyMap = truthyValues
  .map((value) =>
    falsyValues.map((falsyValue) => ({ truthy: value, falsy: falsyValue }))
  )
  .flat();
