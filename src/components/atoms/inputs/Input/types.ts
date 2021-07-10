import { ReactEventHandler } from 'react';

export type InputProps = {
  name?: string;
  onChange?: ReactEventHandler<HTMLInputElement>;
  onBlur?: ReactEventHandler<HTMLInputElement>;
  value?: string;
  defaultValue?: string;
  type?: "text" | "number" | "date" | "password" | "checkbox";
  className?: string;
}
