import React from 'react';
import { Story, Meta } from '@storybook/react';

import { RippleButton, RippleButtonProps } from '../components';

export default {
  title: 'Buttons',
  component: RippleButton,
} as Meta;

const Template: Story<RippleButtonProps> = (args) => <RippleButton {...args} />;

export const RippleButtonExample = Template.bind({});
RippleButtonExample.args = {
  text: 'Click me',
};

export const SuccessRippleButtonExample = Template.bind({});
SuccessRippleButtonExample.args = {
  text: 'Success',
  type: 'success',
};

export const NormalRippleButtonExample = Template.bind({});
NormalRippleButtonExample.args = {
  text: 'Normal',
  type: 'normal',
};

export const GreenRippleButtonExample = Template.bind({});
GreenRippleButtonExample.args = {
  text: 'Green',
  type: 'green',
};

export const PurpleRippleButtonExample = Template.bind({});
PurpleRippleButtonExample.args = {
  text: 'Purple',
  type: 'purple',
};

export const DangerRippleButtonExample = Template.bind({});
DangerRippleButtonExample.args = {
  text: 'Danger',
  type: 'danger',
};

export const InfoRippleButtonExample = Template.bind({});
InfoRippleButtonExample.args = {
  text: 'Info',
  type: 'info',
};

export const ErrorRippleButtonExample = Template.bind({});
ErrorRippleButtonExample.args = {
  text: 'Error',
  type: 'error',
};
