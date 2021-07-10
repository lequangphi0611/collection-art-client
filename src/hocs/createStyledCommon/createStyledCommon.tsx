import pick from "lodash/pick";
import omit from "lodash/omit";
import { forwardRef, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes } from "react";
import styled from "styled-components";
import { createStyleAsString } from "../../utils/createStyleAsString";
import { StyledCommonProps } from "./StyledCommonProps";

const STYLED_COMMON_KEYS: (keyof StyledCommonProps)[] = [
    'width', 'height'
];

const breakpoints = Object.freeze({
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px'
});

export const createStyledCommon = <P extends { className?: string }>(Component: ForwardRefExoticComponent<P>) => styled<ForwardRefExoticComponent<PropsWithoutRef<P & StyledCommonProps> & RefAttributes<unknown>>>(forwardRef((props: P & StyledCommonProps, ref) => {
    return <Component ref={ref} {...omit(props, STYLED_COMMON_KEYS) as P} />
}))`${(props) => createStyleAsString(pick(props, STYLED_COMMON_KEYS), { breakpoints })}`