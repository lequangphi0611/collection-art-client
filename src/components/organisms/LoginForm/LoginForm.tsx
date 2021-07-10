import {LoginFormUI} from './LoginFormUI';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormValues } from './types';
import { useCallback } from 'react';

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<FormValues>({
    shouldFocusError: true,
    defaultValues: {
      username: '',
      password: ''
    }
  });

  const onSubmit: SubmitHandler<{username: string, password: string}> = useCallback((formValues, event) => {
    console.log(formValues, event);
  }, []);

  return <LoginFormUI onSubmit={handleSubmit(onSubmit)} register={register} />;
}
