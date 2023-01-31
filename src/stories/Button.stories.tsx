import React from 'react';
import { Button, ButtonProps } from '../components';
import { Story, Meta } from '@storybook/react';

export default {
  title: 'Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const ButtonExample = Template.bind({});
ButtonExample.args = {
  label: 'Click me',
};
