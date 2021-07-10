import { Breakpoint } from "./Breakpoint";

export type BreakpointCssMapper = Record<
  Breakpoint,
  Record<string, string | number>
>;
