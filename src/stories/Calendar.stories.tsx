import React from 'react';
import { Story, Meta } from '@storybook/react';
import { events } from '../components/Calendar/events';

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

export const CalendarWithEventsExample = Template.bind({});
CalendarWithEventsExample.args = {
  onChange: handleChange,
  date: new Date(2022, 2, 26),
  events: events,
};
