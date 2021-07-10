import { waitFor } from '@testing-library/react'
import { mount, ReactWrapper } from 'enzyme';
import { FORM_KEYS } from './types';
import { LoginForm } from '.';

const USER_NAME_NAME = FORM_KEYS.username;
const PASSWORD_NAME = FORM_KEYS.password;

describe('src/components/organisms/LoginForm', () => {

  const setUp = () => mount(<LoginForm />);

  let loginFormWrapper: ReactWrapper;

  let loginForm: ReactWrapper;

  beforeEach(() => {
    loginFormWrapper = setUp();
    loginForm = loginFormWrapper.find('form');
  });

  afterEach(() => {
      loginFormWrapper.unmount();
  })
;
  it('Should render without error', () => {
    expect(loginFormWrapper.exists()).toBe(true);
  });

  it('Should wrapper by form element', () => {
    expect(loginForm.length).toBe(1);
  });

  describe("The username input field", () => {
    let usernameInput: ReactWrapper;

    beforeEach(() => {
      usernameInput = loginForm.find(`input[name="${USER_NAME_NAME}"]`);
    });

    it('Should rendered', () => {
      expect(usernameInput.length).toBe(1);
    });

    it('Value be blank', () => {
      expect(usernameInput.getDOMNode()).toHaveValue('');
    });

    it('Should change value When user input value', () => {
      usernameInput.simulate('change', {
        target: {
          value: 'quangphi0611'
        }
      })
      expect(usernameInput.getDOMNode()).toHaveValue('quangphi0611');
    });
  })

  describe('The password input', () => {
    let passwordInput: ReactWrapper;

    beforeEach(() => {
      passwordInput = loginForm.find(`input[name="${PASSWORD_NAME}"]`);
    });

    it('Should rendered', () => {
      expect(passwordInput.length).toBe(1);
    });

    it('Have type attibute is password', () => {
      expect(passwordInput.getDOMNode()).toHaveAttribute('type', 'password');
    });

    it('Value to be blank', () => {
      expect(passwordInput.getDOMNode()).toHaveValue('');
    });

    it('Should change value When user input value', async () => {
      passwordInput.simulate('change', {
        target: {
          name: PASSWORD_NAME,
          value: '0325400847'
        }
      });
      await waitFor(() => loginFormWrapper.update());
      passwordInput = loginFormWrapper.find(`input[name="${PASSWORD_NAME}"]`);
      expect(passwordInput.getDOMNode()).toHaveValue('0325400847');
    });
  });

  it('Should render submit button', () => {
    expect(loginForm.find(`button[type="submit"]`)).toHaveLength(1);
  });
});
