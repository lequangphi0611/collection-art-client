import update from "immutability-helper";
import entries from "lodash/entries";
import filter from "lodash/filter";
import flow from "lodash/flow";
import get from "lodash/get";
import isArray from "lodash/isArray";
import isUndefined from "lodash/isUndefined";
import merge from "lodash/merge";
import negate from "lodash/negate";
import reduce from "lodash/reduce";
import map from "lodash/map";
import { Breakpoint } from "./Breakpoint";
import { BreakpointCssMapper } from "./BreakpointCssMapper";
import { BreakpointMapper } from "./BreakpointMapper";
import { CreateStyleAsStringConfig } from "./CreateStyleAsStringConfig";

const XS_BREAKPOINT: Breakpoint = "xs";

const getBreakpointKeyByIndex = (
  breakpoints: BreakpointMapper,
  index: number
): Breakpoint => {
  const breakpointKeys = flow(
    (breakpoints: BreakpointMapper) => entries(breakpoints),
    (breakpointEntries) =>
      map(breakpointEntries, ([breakpointKey]) => breakpointKey)
  )(breakpoints) as Breakpoint[];

  return get(breakpointKeys, index, XS_BREAKPOINT);
};

const convertToBreakpointCssMapper = (
  cssPropsEntries: [string, string | number | Array<string | number>][],
  breakpoints: BreakpointMapper
): BreakpointCssMapper => {
  return reduce(
    cssPropsEntries,
    (breakpointMap, [cssProperty, cssValue]) => {
      let breakpointCssMapper = {};

      if (!isArray(cssValue)) {
        breakpointCssMapper = { xs: { [cssProperty]: cssValue } };
      } else {
        breakpointCssMapper = reduce(
          cssValue,
          (result, css, index) =>
            update(result, {
              [getBreakpointKeyByIndex(breakpoints, index)]: {
                $set: { [cssProperty]: css },
              },
            }),
          {}
        );
      }

      return update(breakpointMap, {
        $apply: (oldBreakpoint) =>
          merge({}, oldBreakpoint, breakpointCssMapper),
      });
    },
    {} as BreakpointCssMapper
  );
};

export const createStyleAsString = (
  argMap: Record<string, string | number | Array<string | number> | undefined>,
  { breakpoints }: CreateStyleAsStringConfig
): string => {
  return flow(
    (
      argMap: Record<
        string,
        string | number | Array<string | number> | undefined
      >
    ) => entries(argMap),
    (argEntries) =>
      filter(argEntries, ([, value]) => negate(isUndefined)(value)) as [
        string,
        string | number | (string | number)[]
      ][],
    (argEntries) => convertToBreakpointCssMapper(argEntries, breakpoints),
    (breakpointMap) =>
      reduce(
        entries(breakpointMap),
        (cssStr, [breakpoint, cssMap]) => {
          const cssConverted = reduce(
            entries(cssMap),
            (output, [property, value]) => `${output}${property}: ${value};`,
            ""
          );

          const breakpointValue = get(breakpoints, breakpoint, "0px");

          const csswithBreakpoint =
            breakpoint === "xs"
              ? cssConverted
              : `@media (min-width: ${breakpointValue}) { ${cssConverted} }`;
          return `${cssStr}${csswithBreakpoint}`;
        },
        ""
      )
  )(argMap);
};
