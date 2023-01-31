import React from "react";
import { render } from "@testing-library/react";
import { snapshotTest } from "../../helpers/test-helpers";
import { For } from "../For";

describe("<For />", () => {
  it("renders correct number of children", () => {
    const each = [1, 2, 3];
    const { queryAllByTestId } = render(
      <For each={each}>
        {(value) => (
          <div key={value} data-testid="child">
            {value}
          </div>
        )}
      </For>
    );

    expect(queryAllByTestId("child").length).toBe(each.length);
  });

  it("renders children with correct values", () => {
    const each = [1, 2, 3];
    const { queryAllByText } = render(
      <For each={each}>{(value) => <div key={value}>{value}</div>}</For>
    );

    each.forEach((value) => {
      expect(queryAllByText(value.toString()).length).toBe(1);
    });
  });

  it("does not render anything if `each` is an empty array", () => {
    const each: Array<number> = [];
    const { queryAllByTestId } = render(
      <For each={each}>{(value) => <div key={value}>{value}</div>}</For>
    );

    expect(queryAllByTestId("child").length).toBe(0);
  });

  it("passes the correct value and index to children", () => {
    const each = [
      { id: 1, name: "Musah", school: "Hacettepe", from: "Kumasi" },
      { id: 2, name: "Shakino", school: "Okess", from: "Oman" },
      { id: 3, name: "Sala", school: "UOEW", from: "Kumasi" },
    ];
    const { queryAllByText } = render(
      <For each={each}>
        {(value, index) => (
          <div
            key={value.id}
          >{`Name: ${value.name}, School ${value.school}, From ${value.from}, Index: ${index}`}</div>
        )}
      </For>
    );

    each.forEach((value, index) => {
      expect(
        queryAllByText(
          `Name: ${value.name}, School ${value.school}, From ${value.from}, Index: ${index}`
        ).length
      ).toBe(1);
    });
  });

  it("passes the correct value and index to children with multiple nodes", () => {
    const each = [{ name: "Musah", school: "Hacettepe", from: "Kumasi" }];
    const { queryByTestId } = render(
      <For each={each}>
        {(value, index) => (
          <React.Fragment key={value.from}>
            <p data-testid="name">Name: {value.name}</p>
            <p data-testid="school">School: {value.school}</p>
            <p data-testid="from">From: {value.from}</p>
            <p data-testid="index">Index: {index}</p>
          </React.Fragment>
        )}
      </For>
    );
    expect(queryByTestId("name")?.textContent).toEqual("Name: Musah");
    expect(queryByTestId("school")?.textContent).toEqual("School: Hacettepe");
    expect(queryByTestId("from")?.textContent).toEqual("From: Kumasi");
    expect(queryByTestId("index")?.textContent).toEqual("Index: 0");
  });
});

describe("<For /> snapshots", () => {
  it("matches the snapshot with an array of numbers", () => {
    snapshotTest(
      <For each={[1, 2, 3]}>
        {(value, index) => <div key={index}>{value}</div>}
      </For>
    );
  });

  it("matches the snapshot with an array of strings", () => {
    snapshotTest(
      <For each={["a", "b", "c"]}>
        {(value, index) => <div key={index}>{value}</div>}
      </For>
    );
  });

  it("matches the snapshot with an empty array", () => {
    snapshotTest(
      <For each={[]}>{(value, index) => <div key={index}>{value}</div>}</For>
    );
  });

  it("passes the correct value and index to children", () => {
    const each = [
      { id: 1, name: "Musah", school: "Hacettepe", from: "Kumasi" },
      { id: 2, name: "Shakino", school: "Okess", from: "Oman" },
      { id: 3, name: "Sala", school: "UOEW", from: "Kumasi" },
    ];

    snapshotTest(
      <For each={each}>
        {(value, index) => (
          <div
            key={value.id}
          >{`Name: ${value.name}, School ${value.school}, From ${value.from}, Index: ${index}`}</div>
        )}
      </For>
    );
  });
});
