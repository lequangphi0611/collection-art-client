import { Story, Meta } from '@storybook/react';

import { Input, InputProps } from '.';
import { StyledCommonProps } from '../../../../hocs/createStyledCommon';

export default {
  title: 'Design System/Atoms/Input',
  component: Input,
  argTypes: {
  },
} as Meta;

const Template: Story<InputProps & StyledCommonProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: ['100px'],
  height: ['100px']
};
