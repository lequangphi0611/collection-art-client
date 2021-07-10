import { InputProps } from './types';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { createStyledCommon, StyledCommonProps } from '../../../../hocs/createStyledCommon';

const StyledInput = styled.input`
  padding: 2px 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  outline: 0;

  &:focus {
    border-color: #0366d6;
    box-shadow: 0 0 0 3px rgba(3,102,214,0.3);
  }
`;

const InputWithCommonStyled = createStyledCommon(StyledInput);

const InputForwardRef = forwardRef<HTMLInputElement, StyledCommonProps & InputProps>((props, ref): JSX.Element => {
  return <InputWithCommonStyled ref={ref} {...props} />
});

InputForwardRef.defaultProps = {
  type: 'text',
  height: '2.25em',
  width: '40em'
};

InputForwardRef.displayName = 'Input';

export const Input = React.memo(InputForwardRef);
