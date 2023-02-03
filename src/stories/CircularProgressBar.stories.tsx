import React from 'react';
import { Story, Meta } from '@storybook/react';

import { CircularProgressBar, CircularProgressProps } from '../components';

export default {
  title: 'Progress/Circular Progress Bar',
  component: CircularProgressBar,
} as Meta;

const Template: Story<CircularProgressProps> = (args) => (
  <CircularProgressBar {...args} />
);

export const CircularProgressBarExample = Template.bind({});
CircularProgressBarExample.args = {
  size: 150,
  progress: 75,
  strokeWidth: 15,
  circleStrokeOne: '#d9edfe',
  showPercent: false,
};
