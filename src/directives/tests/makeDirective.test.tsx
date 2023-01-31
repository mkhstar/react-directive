import React from "react";
import { render } from "@testing-library/react";
import { getKey, makeDirective } from "../makeDirective";
import { truthyValues, falsyValues } from "../../helpers/test-helpers";

describe("getKey()", () => {
  it("returns index when dirKey is not defined", () => {
    expect(getKey(undefined, 0)).toBe(0);
  });

  it('returns passed item itself when dirKey is "this"', () => {
    expect(getKey("item", 0, "this")).toBe("item");
  });

  it("returns value of dirKey property when dirKey is a string", () => {
    const item = { id: 1 };
    expect(getKey(item, 0, "id")).toBe("1");
  });

  it("returns result of calling the function when dirKey is a function", () => {
    const item = { id: 1 };
    const dirKey = jest.fn((i) => i.id);
    expect(getKey(item, 0, dirKey)).toBe(1);
    expect(dirKey).toHaveBeenCalledWith(item);
  });
});

describe("makeDirective", () => {
  it("renders a component with the correct class name when dirIf is truthy", () => {
    truthyValues.forEach((value) => {
      const TestComponent = makeDirective("div");
      const { getByTestId, unmount } = render(
        <TestComponent
          dirIf={value}
          className={{ "test-class": true }}
          data-testid="test-element"
        >
          Test Content
        </TestComponent>
      );

      const element = getByTestId("test-element");
      expect(element).toHaveClass("test-class");
      unmount();
    });
  });

  it("does not render a component when dirIf is falsy", () => {
    falsyValues.forEach((value) => {
      const TestComponent = makeDirective("div");
      const { queryByTestId, unmount } = render(
        <TestComponent dirIf={value} data-testid="test-element">
          Test Content
        </TestComponent>
      );

      const element = queryByTestId("test-element");
      expect(element).toBeNull();
      unmount();
    });
  });

  it("shows a component when dirShow is truthy", () => {
    truthyValues.forEach((value) => {
      const TestComponent = makeDirective("div");
      const { getByTestId, unmount } = render(
        <TestComponent dirShow={value} data-testid="test-element">
          Test Content
        </TestComponent>
      );

      const element = getByTestId("test-element");
      expect(element).not.toHaveStyle("display: none");
      unmount();
    });
  });

  it("hides a component when dirShow is falsy", () => {
    falsyValues.forEach((value) => {
      const TestComponent = makeDirective("div");
      const { getByTestId, unmount } = render(
        <TestComponent dirShow={value} data-testid="test-element">
          Test Content
        </TestComponent>
      );

      const element = getByTestId("test-element");
      expect(element).toHaveStyle("display: none");
      unmount();
    });
  });

  it("when other styles exists and hides a component with dirShow set to false", () => {
    const TestComponent = makeDirective("div");
    const { getByTestId, unmount } = render(
      <TestComponent
        style={{ textAlign: "center", fontSize: 30 }}
        dirShow={false}
        data-testid="test-element"
      >
        Test Content
      </TestComponent>
    );

    const element = getByTestId("test-element");
    expect(element).toHaveStyle("display: none");
    expect(element).toHaveStyle("text-align: center");
    expect(element).toHaveStyle("font-size: 30px");
    unmount();
  });

  it("when display style is specified without dirShow set to false", () => {
    const TestComponent = makeDirective("div");
    const { getByTestId, unmount } = render(
      <TestComponent
        style={{ display: "flex", margin: 20 }}
        data-testid="test-element"
      >
        Test Content
      </TestComponent>
    );
    const element = getByTestId("test-element");
    expect(element).toHaveStyle("display: flex");
    expect(element).toHaveStyle("margin: 20px");
    unmount();
  });

  it("dirShow should override style property's display value", () => {
    const TestComponent = makeDirective("div");
    const { getByTestId, unmount } = render(
      <TestComponent
        dirShow={false}
        style={{ display: "flex" }}
        data-testid="test-element"
      >
        Test Content
      </TestComponent>
    );
    const element = getByTestId("test-element");
    expect(element).toHaveStyle("display: none");
    unmount();
  });

  it("renders a component when dirFor is present", () => {
    const TestComponent = makeDirective("div");
    const { getAllByTestId, unmount } = render(
      <TestComponent
        dirFor={[{ id: 1 }, { id: 2 }]}
        dirKey="id"
        data-testid="test-element"
      >
        Test Content
      </TestComponent>
    );

    const elements = getAllByTestId("test-element");
    expect(elements).toHaveLength(2);
    unmount();
  });

  it("adds the class string to the component", () => {
    const TestComponent = makeDirective("div");
    const { getByTestId, unmount } = render(
      <TestComponent
        dirIf
        className={[{ "test-class": true }, "test-class-2"]}
        data-testid="test-element"
      >
        Test Content
      </TestComponent>
    );

    const element = getByTestId("test-element");
    expect(element).toHaveClass("test-class");
    expect(element).toHaveClass("test-class-2");
    unmount();
  });
});
