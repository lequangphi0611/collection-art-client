import { Control } from 'react-hook-form';
import {  FormEventHandler } from 'react';

export const FORM_KEYS = Object.freeze({
  username: 'username',
  password: 'password'
});

export type FormValues = {
  username: string;
  password: string;
};

export type LoginFormUIProps = {
  control: Control<FormValues>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}
