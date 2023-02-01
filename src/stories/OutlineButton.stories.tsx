import React from 'react';
import { Story, Meta } from '@storybook/react';

import { OutlineButton, OutlineButtonProps } from '../components';

export default {
  title: 'OutlineButtons',
  componenent: OutlineButton,
} as Meta;

const Template: Story<OutlineButtonProps> = (args) => (
  <OutlineButton {...args} />
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
const testFn = () => {};

export const SuccessButtonExample = Template.bind({});
SuccessButtonExample.args = {
  text: 'Success',
  onClick: testFn,
  type: 'success',
};

export const InfoButtonExample = Template.bind({});
InfoButtonExample.args = {
  text: 'Info',
  onClick: testFn,
  type: 'info',
};

export const WarningButtonExample = Template.bind({});
WarningButtonExample.args = {
  text: 'Warning',
  onClick: testFn,
  type: 'warning',
};

export const DangerButtonExample = Template.bind({});
DangerButtonExample.args = {
  text: 'Danger',
  onClick: testFn,
  type: 'danger',
};

export const DefaultButtonExample = Template.bind({});
DefaultButtonExample.args = {
  text: 'Default',
  onClick: testFn,
  type: 'default',
};

export const DarkButtonExample = Template.bind({});
DarkButtonExample.args = {
  text: 'Default',
  onClick: testFn,
  type: 'dark',
};
