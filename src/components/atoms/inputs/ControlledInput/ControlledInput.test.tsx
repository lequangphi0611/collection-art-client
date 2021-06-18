import { ControlledInput, ControlledInputProps } from '.';
import { mount, ReactWrapper } from 'enzyme';
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../Input';



describe('src/components/inputs/ControlledInput', () => {
  type FieldValues = { name: string; age: boolean };
  const ControlledInputPassedControlProps = (props: Omit<ControlledInputProps<FieldValues>, 'control'>) => {
    const { control } = useForm({
      defaultValues: {
        name: '',
        age: 1,
      }
    });

    return <ControlledInput control={control} {...props} />;
  }

  const setUp = (props: Partial<Omit<ControlledInputProps<FieldValues>, 'control'>> = {}) =>
    mount((<ControlledInputPassedControlProps name="age" {...props} />));
  let component: ReactWrapper;

  describe('Non set partial props', () => {

    beforeEach(() => {
      component = setUp();
    });

    it('Should wrap by Controller component', () => {
      expect(component.find(Controller).length).toBe(1);
    });

    it('Render with Input component', () => {
      expect(component.find(Input).length).toBe(1);
    });
  });
})
