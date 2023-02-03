import React from 'react';
import { render } from '@testing-library/react';

import { CircularProgressBar } from '../src/components';

describe('CircularProgressBar tests', () => {
  test('should render correctly', () => {
    const { container } = render(<CircularProgressBar progress={80} />);
    expect(container).toMatchSnapshot();
  });

  test('should render with a score above 50', () => {
    const { container } = render(<CircularProgressBar progress={55} />);
    expect(container).toMatchSnapshot();
  });

  test('should render with a score below 50', () => {
    const { container } = render(<CircularProgressBar progress={45} />);
    expect(container).toMatchSnapshot();
  });

  test('should render with a score below 25', () => {
    const { container } = render(<CircularProgressBar progress={17} />);
    expect(container).toMatchSnapshot();
  });

  test('should render with a score below 75', () => {
    const { container } = render(<CircularProgressBar progress={71} />);
    expect(container).toMatchSnapshot();
  });

  test('should render with a score with 25', () => {
    const { container } = render(<CircularProgressBar progress={25} />);
    expect(container).toMatchSnapshot();
  });

  test('should handle dark mode', () => {
    const { container } = render(
      <CircularProgressBar progress={50} mode="dark" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle dark mode', () => {
    const { container } = render(
      <CircularProgressBar progress={50} mode="light" />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle not showing progress', () => {
    const { container } = render(
      <CircularProgressBar progress={50} mode="light" showPercent={false} />
    );
    expect(container).toMatchSnapshot();
  });
});
