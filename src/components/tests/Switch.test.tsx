import React from "react";
import { render, cleanup } from "@testing-library/react";
import { snapshotTest, truthyFalsyMap } from "../../helpers/test-helpers";
import { Switch, Case, Default } from "../Switch";

afterEach(cleanup);

describe("Switch, Case and Default", () => {
  describe("<Switch />", () => {
    it("renders the first Case whose when prop returns truthy value", () => {
      truthyFalsyMap.forEach((value) => {
        const { getByText, queryByText, unmount } = render(
          <Switch>
            <Case when={value.falsy}>
              <div>Case 1</div>
            </Case>
            <Case when={value.truthy}>
              <div>Case 2</div>
            </Case>
            <Case when={value.truthy}>
              <div>Case 3</div>
            </Case>
            <Default>
              <div>Default</div>
            </Default>
          </Switch>
        );
        expect(queryByText("Case 1")).toBeNull();
        expect(getByText("Case 2")).toBeInTheDocument();
        expect(queryByText("Case 3")).toBeNull();
        expect(queryByText("Default")).toBeNull();
        unmount();
      });
    });

    it("renders the first Case whose when prop function returns true", () => {
      truthyFalsyMap.forEach((value) => {
        const { getByText, queryByText, unmount } = render(
          <Switch>
            <Case when={() => value.falsy}>
              <div>Case 1</div>
            </Case>
            <Case when={() => value.truthy}>
              <div>Case 2</div>
            </Case>
            <Case when={value.truthy}>
              <div>Case 3</div>
            </Case>
            <Default>
              <div>Default</div>
            </Default>
          </Switch>
        );
        expect(queryByText("Case 1")).toBeNull();
        expect(getByText("Case 2")).toBeInTheDocument();
        expect(queryByText("Case 3")).toBeNull();
        expect(queryByText("Default")).toBeNull();
        unmount();
      });
    });

    it("renders the Default component if no Case's when prop returns true", () => {
      const { getByText, queryByText, unmount } = render(
        <Switch>
          <Case when={false}>
            <div>Case 1</div>
          </Case>
          <Case when={false}>
            <div>Case 2</div>
          </Case>
          <Default>
            <div>Default</div>
          </Default>
        </Switch>
      );
      expect(queryByText("Case 1")).toBeNull();
      expect(queryByText("Case 2")).toBeNull();
      expect(getByText("Default")).toBeInTheDocument();
      unmount();
    });
  });

  describe("<Case />", () => {
    it("renders children if when prop returns true", () => {
      const { getByText, unmount } = render(
        <Case when>
          <div>Case</div>
        </Case>
      );
      expect(getByText("Case")).toBeInTheDocument();
      unmount();
    });

    it("renders children if when prop function returns true", () => {
      const { getByText, unmount } = render(
        <Case when={() => true}>
          <div>Case</div>
        </Case>
      );
      expect(getByText("Case")).toBeInTheDocument();
      unmount();
    });

    it("does not render children if when prop returns false", () => {
      const { queryByText, unmount } = render(
        <Case when={false}>
          <div>Case</div>
        </Case>
      );
      expect(queryByText("Case")).toBeNull();
      unmount();
    });
  });

  describe("<Default />", () => {
    it("Should render whatever child it receives", () => {
      const { getByText, unmount } = render(
        <Default>
          <div>Default</div>
        </Default>
      );
      expect(getByText("Default")).toBeInTheDocument();
      unmount();
    });
  });
});

describe("<Switch /> snapshots", () => {
  it("matches the snapshot with the matching case", () => {
    snapshotTest(
      <Switch>
        <Case when>
          <div>Case 1</div>
        </Case>
        <Case when={false}>
          <div>Case 2</div>
        </Case>
      </Switch>
    );
    snapshotTest(
      <Switch>
        <Case when={false}>
          <div>Case 1</div>
        </Case>
        <Case when>
          <div>Case 2</div>
        </Case>
        <Case when>
          <div>Case 3</div>
        </Case>
        <Default>
          <div>Default</div>
        </Default>
      </Switch>
    );
  });

  it("matches the snapshot with the default case", () => {
    snapshotTest(
      <Switch>
        <Case when={false}>
          <div>Case 1</div>
        </Case>
        <Default>
          <div>Default case</div>
        </Default>
      </Switch>
    );
    snapshotTest(
      <Switch>
        <Case when={false}>
          <div>Case 1</div>
        </Case>
      </Switch>,
      "No default case"
    );
  });
});
