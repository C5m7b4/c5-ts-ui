import React from 'react';
import { Meta, Story } from '@storybook/react';

import { SelectField, SelectFieldProps } from '../components';

const fakeData = [
  {
    id: 1,
    name: 'tim',
    age: 25,
  },
  {
    id: 2,
    name: 'sally',
    age: 23,
  },
];

export default {
  title: 'Forms/Select',
  component: SelectField,
} as Meta;

const Template =
  <T extends {}>(): Story<SelectFieldProps<T>> =>
  (args) =>
    <SelectField<T> {...args} />;

export const SelectFieldExample = Template<object>().bind({});

SelectFieldExample.args = {
  id: '1',
  labell: 'Select a person',
  name: 's1',
  data: fakeData,
  emptyMsg: 'Select a person',
  error: 'There is an error',
  displayField: 'name',
  valueField: 'id',
};
