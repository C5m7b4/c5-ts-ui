import React from 'react';
import { render, screen } from '@testing-library/react';

import { TextField } from '../src';

describe('TextInput tests', () => {
  const testFn = jest.fn();

  test('should render correctly', () => {
    const frag = render(
      <TextField
        id="testid"
        name="testid"
        value="test"
        placeholder="test"
        label="test"
        type="text"
        onChange={testFn}
      />
    );
    expect(frag).toMatchSnapshot();
  });

  test('should render with an error', () => {
    const frag = render(
      <TextField
        id="testId"
        name="testId"
        value="test"
        placeholder="test"
        label="test"
        type="text"
        onChange={testFn}
        error="You got an error"
      />
    );

    expect(frag).toMatchSnapshot();
  });

  test('should render the correct value', () => {
    render(
      <TextField
        id="testId"
        name="testId"
        value="test"
        placeholder="test"
        label="test"
        type="text"
        onChange={testFn}
        error="You got an error"
      />
    );
    const input: HTMLInputElement = screen.getByRole('textbox', {
      name: /test/i,
    });

    expect(input.value).toEqual('test');
  });

  test('should display an error', () => {
    render(
      <TextField
        id="testId"
        name="testId"
        value="test"
        placeholder="test"
        label="test"
        type="text"
        onChange={testFn}
        error="You got an error"
      />
    );

    const div: HTMLDivElement = screen.getByTestId('alert');
    expect(div.innerHTML).toEqual('You got an error');
  });

  test('should not render an error', () => {
    render(
      <TextField
        id="testId"
        name="testId"
        value="test"
        placeholder="test"
        label="test"
        type="text"
        onChange={testFn}
        error=""
      />
    );
    let div;
    try {
      div = screen.getByTestId('alert');
    } catch {}

    expect(div).toBeUndefined();
  });
});
