import React from 'react';
import { render, screen } from '@testing-library/react';

import { SelectField } from '../src';

describe('SelectField tests', () => {
  const testFn = jest.fn();
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

  test('should render correctly', () => {
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="select a person"
      />
    );

    expect(frag).toMatchSnapshot();
  });

  test('should render with an error', () => {
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="select a person"
        error="you got an error"
      />
    );
    expect(frag).toMatchSnapshot();
  });

  test('should render the error message you got an error', () => {
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="Select a person"
        error="You got an error"
      />
    );
    expect(frag).toMatchSnapshot();

    const div: HTMLDivElement = screen.getByTestId('alert');
    expect(div.innerHTML).toEqual('You got an error');
  });

  test('should render with empty data', () => {
    const fake = [];
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fake}
        displayField="name"
        valueField="id"
        emptyMsg="Select a person"
        error="You got an error"
      />
    );
    expect(frag).toMatchSnapshot();
    const div: HTMLDivElement = screen.getByTestId('alert');
    expect(div.innerHTML).toEqual('You got an error');
  });

  test('should render with an empty error message', () => {
    const frag = render(
      <SelectField
        id="test"
        name="test"
        label="test"
        onChange={testFn}
        data={fakeData}
        displayField="name"
        valueField="id"
        emptyMsg="select a person"
        error=""
      />
    );

    expect(frag).toMatchSnapshot();
  });
});
