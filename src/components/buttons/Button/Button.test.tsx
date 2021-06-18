import { Button } from './Button';
import { ButtonProps } from './types';
import merge from 'lodash/merge';
import { mount } from 'enzyme';

describe('src/components/buttons/Button', () => {
  const defaultProps: ButtonProps = {
    children: 'Button content'
  }

  const renderButton = (props?: Partial<ButtonProps>) => {
    return mount(<Button {...merge(defaultProps, props)} />)
  }

  it('Render without errors', async () => {
    renderButton();
  });;

  it('Should render button element', () => {
    const wrapper = renderButton();
    expect(wrapper.find('button').exists()).toBeTruthy();
  });

  it('Should call on click callback When click button', () => {
    const onClickFn = jest.fn();
    const wrapper = renderButton({
      onClick: onClickFn
    });
    wrapper.find('button').simulate('click');
    expect(onClickFn).toHaveBeenCalledTimes(1);
  });

  it('Should button is disabled When pass disabled is true', () => {
    const wrapper = renderButton({ disabled: true });
    expect(wrapper.find('button').getDOMNode()).toHaveAttribute('disabled');
  });

  it('Should button not have disabled attr When pass disabled is false', () => {
    const wrapper = renderButton({ disabled: false });
    expect(wrapper.find('button').getDOMNode()).not.toHaveAttribute('disabled');
  });

  it('Should set class name for button element When set class name props', () => {
    const CLASS_NAME = 'BUTTON_CLASS';
    const wrapper = renderButton({ className: CLASS_NAME });
    expect(wrapper.find('button').getDOMNode()).toHaveClass(CLASS_NAME);
  });

  it('Should shave content When set childten props', () => {
    const wrapper = renderButton();
    expect(wrapper.find('button').getDOMNode()).toHaveTextContent('Button content');
  });

  it('Should set type submit When set type equal submit', () => {
    const wrapper = renderButton({ type: 'submit' });
    expect(wrapper.find('button').getDOMNode()).toHaveAttribute('type', "submit");
  });
})
