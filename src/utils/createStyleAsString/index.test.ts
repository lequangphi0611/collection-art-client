import "@testing-library/react";
import { partialRight } from "lodash";
import { createStyleAsString } from ".";

describe("utils/createStyleAsString", () => {
  const breakpoints = Object.freeze({
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    xxl: "1400px",
  });

  const createStyleAsStringWithBreakpoints = partialRight(createStyleAsString, {
    breakpoints,
  });

  it("Can convert simple one record to string style", () => {
    const objStyle = {
      padding: "20px 20px",
    };
    expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
      "padding: 20px 20px;"
    );
  });

  it("Can convert simple many record to string style", () => {
    const objStyle = {
      padding: "20px 20px",
      width: 100,
      height: "100em",
    };
    expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
      `padding: 20px 20px;width: 100;height: 100em;`
    );
  });

  it("Can ignore convert string style when value is undefined", () => {
    const objStyle = {
      padding: "20px 20px",
      width: undefined,
      height: "100em",
    };
    expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
      `padding: 20px 20px;height: 100em;`
    );
  });

  describe("Create style with breakpoint", () => {
    it("with xs breakpoint", () => {
      const objStyle = {
        padding: ["20px 15px"],
      };

      expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
        "padding: 20px 15px;"
      );
    });

    it("with sm breakpoint", () => {
      const objStyle = {
        padding: ["20px 15px", "20px"],
      };

      expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
        "padding: 20px 15px;@media (min-width: 576px) { padding: 20px; }"
      );
    });

    it("with md breakpoint", () => {
      const objStyle = {
        padding: ["20px 15px", "20px", "30px"],
      };

      expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
        "padding: 20px 15px;@media (min-width: 576px) { padding: 20px; }@media (min-width: 768px) { padding: 30px; }"
      );
    });

    it("with lg breakpoint", () => {
      const objStyle = {
        padding: ["20px 15px", "20px", "30px", "40px"],
      };

      expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
        "padding: 20px 15px;@media (min-width: 576px) { padding: 20px; }@media (min-width: 768px) { padding: 30px; }@media (min-width: 992px) { padding: 40px; }"
      );
    });

    it("with xl breakpoint", () => {
      const objStyle = {
        padding: ["20px 15px", "20px", "30px", "40px", "50px"],
      };

      expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
        "padding: 20px 15px;@media (min-width: 576px) { padding: 20px; }@media (min-width: 768px) { padding: 30px; }@media (min-width: 992px) { padding: 40px; }@media (min-width: 1200px) { padding: 50px; }"
      );
    });

    it("with xxl breakpoint", () => {
      const objStyle = {
        padding: ["20px 15px", "20px", "30px", "40px", "50px", "60px"],
      };

      expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
        "padding: 20px 15px;@media (min-width: 576px) { padding: 20px; }@media (min-width: 768px) { padding: 30px; }@media (min-width: 992px) { padding: 40px; }@media (min-width: 1200px) { padding: 50px; }@media (min-width: 1400px) { padding: 60px; }"
      );
    });

    it("Multiple css property in one breakpoint", () => {
        const objStyle = {
            padding: ["20px 15px"],
            'margin-right': ['5px'],
          };

          expect(createStyleAsStringWithBreakpoints(objStyle)).toBe(
            `padding: 20px 15px;margin-right: 5px;`
          );
    });
  });
});
