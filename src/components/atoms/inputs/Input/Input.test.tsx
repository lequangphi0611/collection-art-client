import { Input } from './Input';
import { InputProps } from './types';
import { mount, ReactWrapper } from 'enzyme';
import { createRef, Ref } from 'react';

describe('src/components/inputs/Input', () => {
  const setUp = (props: Partial<InputProps> = {}, ref?: Ref<HTMLInputElement>): ReactWrapper => {
    return mount(<Input {...props} ref={ref} />)
  };

  it('render without errors', () => {
    const wrapper = setUp();
    console.log(wrapper.debug());
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('Can set name attribute', () => {
    const wrapper = setUp({ name: 'input-name' });
    expect(wrapper.find('input').getDOMNode()).toHaveAttribute('name', 'input-name');
  });

  it('Can set defaultValue', () => {
    const wrapper = setUp({ defaultValue: 'input value' });
    expect(wrapper.find('input').getDOMNode()).toHaveValue('input value');
  });

  it('Can set value', () => {
    const wrapper = setUp({ value: 'input value', onChange: jest.fn() });
    expect(wrapper.find('input').getDOMNode()).toHaveValue('input value');
  });

  it('Can set onChange and can change input value', () => {
    const changeFN = jest.fn();
    const wrapper = setUp({ onChange: changeFN });
    wrapper.simulate('change', {
      target: {
        value: 'new value'
      },
    });
    expect(changeFN).toHaveBeenCalledWith(expect.objectContaining({
      target: {
        value: 'new value'
      }
    }));
  });

  it('Can refer to input dom', () => {
    const inputRef = createRef<HTMLInputElement>();
    const wrapper = setUp({}, inputRef);
    expect(wrapper.find('input').getDOMNode()).toEqual(inputRef.current);
  });

  it('Can set blur callback when dispatch blur event', () => {
    const blurFn = jest.fn();
    const wrapper = setUp({ onBlur: blurFn  });
    wrapper.simulate('blur', {});
    expect(blurFn).toHaveBeenCalledTimes(1);
  });

  it('Can set class name attibute', () => {
    const wrapper = setUp({ className: 'input-classes'  });
    expect(wrapper.find('input').getDOMNode()).toHaveClass('input-classes');
  });

  it('Should type input default is text', () => {
    const wrapper = setUp();
    expect(wrapper.find('input').getDOMNode()).toHaveAttribute('type', 'text');
  });

  it('Can set input type is text', () => {
    const wrapper = setUp({ type: 'text' });
    expect(wrapper.find('input').getDOMNode()).toHaveAttribute('type', 'text');
  });
});
