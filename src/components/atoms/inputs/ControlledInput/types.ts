import { Control, Path } from 'react-hook-form';
import { ComponentType } from 'react';
import { InputProps } from '../Input';

export type ControlledInputProps<TField, AsProps = InputProps> = AsProps & {
  control: Control<TField>;
  name: Path<TField>;
  as?: ComponentType<AsProps>
}
