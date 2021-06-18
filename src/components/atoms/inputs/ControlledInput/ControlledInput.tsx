import React from 'react';
import { Controller } from 'react-hook-form';
import { ControlledInputProps } from './types';
import { Input, InputProps } from '../Input';

const typedMemo: <T>(c: T) => T = React.memo;

const ControlledInputNonMemories = <TField extends object, AsProps = InputProps> ({ name, control, as: AsComponent = Input, ...rest }: ControlledInputProps<TField, AsProps>) => {
  return <Controller control={control} name={name} render={() => <AsComponent {...rest} />} />
};

export const ControlledInput = typedMemo(ControlledInputNonMemories);
