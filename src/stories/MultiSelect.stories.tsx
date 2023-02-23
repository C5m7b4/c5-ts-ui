import React from 'react';
import { Story, Meta } from '@storybook/react';

import { MultiSelect, MultiSelectProps } from '../components';

let checkedItems: string[] = [];

const data = [
  {
    id: 1,
    value: 'Grocery',
  },
  {
    id: 2,
    value: 'Nonfood',
  },
  {
    id: 3,
    value: 'HBA',
  },
  {
    id: 4,
    value: 'Meat',
  },
  {
    id: 5,
    value: 'Meat by #',
  },
  {
    id: 6,
    value: 'Produce',
  },
  {
    id: 7,
    value: 'Produce by #',
  },
];

const setCheckedItems = (s: string[]) => {
  checkedItems = s;
};

export default {
  title: 'Forms/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
  },
} as Meta;

const Template =
  <T extends {}>(): Story<MultiSelectProps<T>> =>
  (args) =>
    <MultiSelect {...args} />;

export const MultiSelectExample = Template<object>().bind({});
MultiSelectExample.args = {
  data,
  defaultOption: 'Select a Department',
  keyDescriptor: 'ms-cb-1',
  optionValue: 'id',
  optionText: 'value',
  checkedItems: checkedItems,
  setCheckedItems: setCheckedItems,
  inputId: 'inputId',
};
