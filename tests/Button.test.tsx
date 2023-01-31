import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Button } from '../src/components';

describe('Button tests', () => {
  test('should render the button correctly', () => {
    render(<Button label="click me" />);
  });

  test('should match snapshot', () => {
    const fragment = render(<Button label="click me" />);
    expect(fragment).toMatchSnapshot();
  });

  test('should handle normal type', () => {
    const { container } = render(<Button label="click me" type="normal" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });

  test('should handle green type', () => {
    const { container } = render(<Button label="click me" type="green" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });

  test('should handle purple type', () => {
    const { container } = render(<Button label="click me" type="purple" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });

  test('should handle danger type', () => {
    const { container } = render(<Button label="click me" type="danger" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });

  test('should handle success type', () => {
    const { container } = render(<Button label="click me" type="success" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });

  test('should handle error type', () => {
    const { container } = render(<Button label="click me" type="error" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });

  test('should handle info type', () => {
    const { container } = render(<Button label="click me" type="info" />);
    const btn = container.querySelector('button') as HTMLButtonElement;
    fireEvent.mouseEnter(btn);
    expect(container).toMatchSnapshot();
  });
});
