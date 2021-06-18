 import { ButtonProps } from './types';
 import React from 'react';

export const Button = React.memo((props: ButtonProps): JSX.Element => {
  return <button {...props} />
});
