import React from 'react';
import { Story, Meta } from '@storybook/react';

import { PSM, PSMProps } from '../components';

export default {
  title: 'Widgets/PSM',
  component: PSM,
} as Meta;

const Template: Story<PSMProps> = (args) => <PSM {...args} />;

export const PSMExample = Template.bind({});
PSMExample.args = {
  userid: 1,
  confirmPasswordChange: (password) => {
    // eslint-disable-next-line no-console
    console.log(password);
  },
};
