import { memo } from 'react';
import { LoginFormUIProps } from './types';
import { Button } from '../../buttons/Button';
import { Input } from '../../atoms/inputs/Input';

export const LoginFormUI = memo<LoginFormUIProps>(({ register, onSubmit }): JSX.Element => {
  return (
    <form onSubmit={onSubmit} >
      <Input  {...register('username')} />
      <Input type="password" {...register('password')} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
)
