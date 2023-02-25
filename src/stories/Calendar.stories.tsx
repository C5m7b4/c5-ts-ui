import React from 'react';
import { Story, Meta } from '@storybook/react';

import { Calendar, CalendarProps } from '../components';

export default {
  title: 'Widgets/Calendar',
  component: Calendar,
} as Meta;

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

const handleChange = (d: Date) => {
  // eslint-disable-next-line no-console
  console.log(d);
};

export const CalendarExample = Template.bind({});
CalendarExample.args = {
  onChange: handleChange,
  date: new Date(),
};
