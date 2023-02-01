import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RippleButton } from '../src';

describe('RippleButton tests', () => {
  const testFn = jest.fn();
  test('should render correctly', () => {
    const frag = render(<RippleButton text="Click me" onClick={testFn} />);
    expect(frag).toMatchSnapshot();
  });

  test('should unmount', () => {
    jest.useFakeTimers();
    const testFn = jest.fn();
    const { unmount, rerender } = render(
      <RippleButton text="Click Me" onClick={testFn} />
    );
    rerender(<RippleButton text="Click Me again" onClick={testFn} />);
    unmount();
    jest.advanceTimersByTime(500);
  });

  test('should handle green type', () => {
    const testFn = jest.fn();
    const { container } = render(
      <RippleButton text="Click Me" onClick={testFn} type="green" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle purple type', () => {
    const testFn = jest.fn();
    const { container } = render(
      <RippleButton text="Click Me" onClick={testFn} type="purple" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle danger type', () => {
    const testFn = jest.fn();
    const { container } = render(
      <RippleButton text="Click Me" onClick={testFn} type="danger" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle info type', () => {
    const testFn = jest.fn();
    const { container } = render(
      <RippleButton text="Click Me" onClick={testFn} type="info" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle success type', () => {
    const testFn = jest.fn();
    const { container } = render(
      <RippleButton text="Click Me" onClick={testFn} type="success" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle error type', () => {
    const testFn = jest.fn();
    const { container } = render(
      <RippleButton text="Click Me" onClick={testFn} type="error" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle click event', async () => {
    jest.useFakeTimers();
    const testFn = jest.fn();
    render(<RippleButton text="Click Me" onClick={testFn} />);

    const btn = screen.getByRole('button');

    await fireEvent.click(btn);
    jest.advanceTimersByTime(1000);
  });

  test('should simulate a mouse leave event', () => {
    const testFn = jest.fn();
    render(<RippleButton text="Click Me" onClick={testFn} />);

    const btn = screen.getByRole('button');

    fireEvent.mouseOver(btn);
    fireEvent.mouseLeave(btn);
  });
});
