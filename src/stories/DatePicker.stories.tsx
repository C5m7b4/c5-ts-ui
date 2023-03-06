import React from 'react';
import { Story, Meta } from '@storybook/react';

import { DatePicker, DatePickerProps } from '../components';

export default {
  title: 'Pickers/DatePicker',
  component: DatePicker,
} as Meta;

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const DatePickerExample = Template.bind({});
DatePickerExample.args = {
  date: new Date('3/2/2023'),
};
