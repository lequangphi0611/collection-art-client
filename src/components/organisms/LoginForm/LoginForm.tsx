import {LoginFormUI} from './LoginFormUI';
import { useForm } from 'react-hook-form';
import { FormValues } from './types';
import { useCallback } from 'react';

export const LoginForm = () => {
  const { control } = useForm<FormValues>({
    shouldFocusError: true,
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit = useCallback(() => {

  }, []);

  return <LoginFormUI onSubmit={onSubmit} control={control} />;
}
