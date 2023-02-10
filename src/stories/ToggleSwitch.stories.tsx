import React from 'react';
import { Story, Meta } from '@storybook/react';

import { ToggleSwitch, ToggleSwitchProps } from '../components';

export default {
  title: 'ToggleSwitch',
  component: ToggleSwitch,
} as Meta;

const Template: Story<ToggleSwitchProps> = (args) => <ToggleSwitch {...args} />;

const fn = () => {
  // eslint-disable-next-line no-console
  console.log('i was clicked');
};

export const ToggleSwitchExample = Template.bind({});
ToggleSwitchExample.args = {
  id: 'toggle1',
  active: true,
  handleClick: fn,
};
