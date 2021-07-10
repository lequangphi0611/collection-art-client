import { Story, Meta } from '@storybook/react';

import { LoginForm } from '.';

export default {
  title: 'Design System/organisms/LoginForm',
  component: LoginForm,
  argTypes: {
  },
} as Meta;

const Template: Story<{}> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
};
