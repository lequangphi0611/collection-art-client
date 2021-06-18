import { InputProps } from './types';
import React from 'react';

const typedMemo: <T>(c: T) => T = React.memo;

const InputForwardRef = React.forwardRef<HTMLInputElement, InputProps>((props, ref): JSX.Element => {
  return <input ref={ref} {...props} />
});

InputForwardRef.defaultProps = {
  type: 'text'
}

export const Input = typedMemo(InputForwardRef);
