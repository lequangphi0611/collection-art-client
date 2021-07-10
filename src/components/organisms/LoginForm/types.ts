import { UseFormReturn } from 'react-hook-form';
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
  register: UseFormReturn<FormValues>['register'];
  onSubmit: FormEventHandler<HTMLFormElement>;
}
