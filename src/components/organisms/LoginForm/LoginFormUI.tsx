import { memo } from 'react';
import { LoginFormUIProps } from './types';
import { Button } from '../../buttons/Button';
import { Input } from '../../atoms/inputs/Input';
import { Controller } from 'react-hook-form';

export const LoginFormUI = memo<LoginFormUIProps>(({ control, onSubmit }): JSX.Element => {
  return (
    <form onSubmit={onSubmit} >
      <Controller name={"username"} control={control} render={({ field }) => <Input {...field} />} />
      <Controller name={"password"} control={control} render={({ field }) => <Input type="password" {...field} />} />
      <Button type="submit">Submit</Button>
    </form>
  )
}
)
