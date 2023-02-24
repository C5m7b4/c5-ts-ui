import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PSM } from '../src';

describe('PSM tests', () => {
  const testFn = jest.fn();

  test('should render correctly', () => {
    const { container } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle a single character', async () => {
    render(<PSM userid={1} confirmPasswordChange={testFn} />);

    await userEvent.type(screen.getByPlaceholderText(/enter password/i), '1');

    const input = screen.getByPlaceholderText(
      /enter password/i
    ) as HTMLInputElement;
    expect(input.value).toEqual('1');
  });

  test('should handle two characters', async () => {
    render(<PSM userid={1} confirmPasswordChange={testFn} />);

    await userEvent.type(screen.getByPlaceholderText(/enter password/i), '!1');

    const input = screen.getByPlaceholderText(
      /enter password/i
    ) as HTMLInputElement;
    expect(input.value).toEqual('!1');
  });

  test('should handle three characters', async () => {
    render(<PSM userid={1} confirmPasswordChange={testFn} />);

    await userEvent.type(screen.getByPlaceholderText(/enter password/i), '!1S');

    const input = screen.getByPlaceholderText(
      /enter password/i
    ) as HTMLInputElement;
    expect(input.value).toEqual('!1S');
  });

  test('should handle five characters', async () => {
    render(<PSM userid={1} confirmPasswordChange={testFn} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '!1Sma'
    );

    const input = screen.getByPlaceholderText(
      /enter password/i
    ) as HTMLInputElement;
    expect(input.value).toEqual('!1Sma');
  });

  test('should handle eight characters', async () => {
    render(<PSM userid={1} confirmPasswordChange={testFn} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '!1Smart1'
    );

    const input = screen.getByPlaceholderText(
      /enter password/i
    ) as HTMLInputElement;
    expect(input.value).toEqual('!1Smart1');
  });

  test('should handle more 17 characters', async () => {
    render(<PSM userid={1} confirmPasswordChange={testFn} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '!1Smart1@5a!1l111'
    );

    const input = screen.getByPlaceholderText(
      /enter password/i
    ) as HTMLInputElement;
    expect(input.value).toEqual('!1Smart1@5a!1l111');
  });

  test('should show submit button', async () => {
    const mockCallback = jest.fn();
    const { container } = render(
      <PSM userid={1} confirmPasswordChange={mockCallback} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '!!@5Teams5!!@'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '!!@5Teams5!!@'
    );

    const btn = container.querySelector('button');
    expect(btn).toBeVisible();
  });

  test('should handle not having a userid', async () => {
    const mockCallback = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<PSM confirmPasswordChange={mockCallback} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '!!@5Teams5!!@'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '!!@5Teams5!!@'
    );

    const btn = container.querySelector('button');
    if (btn) {
      fireEvent.click(btn);
      const text = screen.getByText('Please select a user');
      expect(text).toBeVisible();
    }
  });

  test('should handle having a 0 for userid', async () => {
    const mockCallback = jest.fn();
    const { container } = render(
      <PSM userid={0} confirmPasswordChange={mockCallback} />
    );

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '!!@5Teams5!!@'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '!!@5Teams5!!@'
    );

    const btn = container.querySelector('button');
    if (btn) {
      fireEvent.click(btn);
      const text = screen.getByText('Please select a user');
      expect(text).toBeVisible();
    }
  });

  test('should show passwords dont match', async () => {
    const mockCallback = jest.fn();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<PSM confirmPasswordChange={mockCallback} />);

    await userEvent.type(
      screen.getByPlaceholderText(/enter password/i),
      '!!@5Teams5!!@'
    );
    await userEvent.type(
      screen.getByPlaceholderText(/confirm password/i),
      '!!@5Teams5!!'
    );

    const btn = container.querySelector('button');
    if (btn) {
      fireEvent.click(btn);
      const text = screen.getByText('Passwords do not match');
      expect(text).toBeVisible();
    }
  });

  test('should successfully submit new password', async () => {
    const testFn = jest.fn();

    const { container } = render(
      <PSM userid={1} confirmPasswordChange={testFn} />
    );
    await userEvent.type(
      screen.getByPlaceholderText('Enter Password'),
      '!!@5Teams5!!@'
    );
    await userEvent.type(
      screen.getByPlaceholderText('Confirm Password'),
      '!!@5Teams5!!@'
    );
    const btn = container.querySelector('button');
    if (btn) {
      fireEvent.click(btn);
      expect(testFn.mock.calls.length).toEqual(1);
      expect(testFn).toBeCalledTimes(1);
    }
  });
});
