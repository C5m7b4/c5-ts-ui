import React from 'react';
import { Meta, Story } from '@storybook/react';

import TooltipDemo, {
  TooltipDemoProps,
} from '../components/Tooltip/TooltipDemo';

export default {
  title: 'Widgets/Tooltip',
  component: TooltipDemo,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template: Story<TooltipDemoProps> = (args) => <TooltipDemo {...args} />;

export const TooltipDemoExampleTop = Template.bind({});
TooltipDemoExampleTop.args = {
  position: 'top',
  message: 'Top tooltip',
  theme: 'dark',
  messageStyle: {
    padding: '20px',
    borderRadius: '10px',
  },
};

export const TooltipDemoExampleBottom = Template.bind({});
TooltipDemoExampleBottom.args = {
  position: 'bottom',
  message: 'Bottom Tooltip',
  theme: 'dark',
};

export const TooltipDemoExampleLeft = Template.bind({});
TooltipDemoExampleLeft.args = {
  position: 'left',
  message: 'Left Tooltip',
  theme: 'dark',
};

export const TooltipDemoExampleRight = Template.bind({});
TooltipDemoExampleRight.args = {
  position: 'right',
  message: 'Right Tooltip',
  theme: 'dark',
};
