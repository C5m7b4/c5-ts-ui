import React from 'react';
import { Story, Meta } from '@storybook/react';

import { TextField, TextFieldProps } from '../components';

export default {
  title: 'Forms/TextField',
  component: TextField,
} as Meta;

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const TextFieldExample = Template.bind({});
TextFieldExample.args = {
  id: 't1',
  name: 't1',
  label: 'This is my input',
  type: 'text',
  placeholder: 'Enter your name',
  value: 'Mike',
};

export const TextInputReadOnlyExample = Template.bind({});
TextInputReadOnlyExample.args = {
  id: 't1',
  name: 't1',
  label: 'This is my input',
  type: 'text',
  placeholder: 'Enter your name',
  readOnly: true,
};
