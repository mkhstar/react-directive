import { renderHook } from "@testing-library/react";
import { useClassName } from "../useClassName";

describe("useClassName", () => {
  it("should return empty string if it gets not args", () => {
    const { result } = renderHook(() => useClassName());
    expect(result.current).toBe("");
  });

  describe("When string is received", () => {
    it("returns class names passed to it", () => {
      const classes = "some class";
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("some class");
    });
  });

  describe("When array is received", () => {
    it("returns class names", () => {
      const classes = [{ foo: true, bar: false }];
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("foo");
    });

    it("returns class names with other class names", () => {
      const classes = ["some-other-class", { foo: true, bar: false }];
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("some-other-class foo");
    });

    it("returns class names with other multiple class names", () => {
      const classes = [
        "some-other-class",
        { foo: true, bar: false },
        "another-class",
      ];
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("some-other-class foo another-class");
    });
  });

  describe("When object is received", () => {
    it("returns class names", () => {
      const classes = { foo: true, bar: false };
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("foo");
    });
    it("returns class names with truthy or falsy values", () => {
      const classes = {
        foo: 1,
        bar: 0,
        something: "",
        name: null,
        blue: true,
        yellow: false,
        value: undefined,
        userName: "jdoe",
      };
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("foo blue userName");
    });
    it("returns an empty string when no classes are passed", () => {
      const classes = {};
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("");
    });
    it("returns an empty string when all classes are falsy", () => {
      const classes = {
        value1: false,
        value2: "",
        value3: 0,
        value4: null,
        value5: undefined,
      };
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("");
    });
    it("returns multiple class names when multiple classes are passed", () => {
      const classes = { foo: true, bar: true, something: false, smooth: true };
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toBe("foo bar smooth");
    });
    it("returns class names without leading or trailing spaces", () => {
      const classes = { foo: true, bar: false };
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).not.toMatch(/^ | $/);
    });
    it("returns class names with a single space between each class", () => {
      const classes = { foo: true, bar: true };
      const { result } = renderHook(() => useClassName(classes));
      expect(result.current).toEqual("foo bar");
    });

    describe("Dependencies and effects", () => {
      it("falls back to classes when deps are not provided", () => {
        let myClasses = { foo: true, bar: false };
        const { result, rerender } = renderHook(
          ({ classes }) => useClassName(classes),
          {
            initialProps: {
              classes: myClasses,
            },
          }
        );
        expect(result.current).toBe("foo");

        rerender({ classes: myClasses });
        expect(result.current).toBe("foo");

        myClasses.bar = true;
        rerender({ classes: myClasses });
        expect(result.current).toBe("foo"); // same object in memory, will not cause re-calculation

        myClasses = { foo: true, bar: true }; // same values but different object in memory
        rerender({ classes: myClasses });
        expect(result.current).toBe("foo bar");
      });
      it("updates class names on dependency change", () => {
        const { result, rerender } = renderHook(
          ({ classes, deps }) => useClassName(classes, deps),
          {
            initialProps: {
              classes: { foo: true, bar: false },
              deps: [true, false],
            },
          }
        );
        expect(result.current).toBe("foo");
        rerender({ classes: { foo: false, bar: true }, deps: [false, true] });
        expect(result.current).toBe("bar");
      });
    });
  });
});
