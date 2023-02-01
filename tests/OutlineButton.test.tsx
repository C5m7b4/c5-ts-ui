import React from 'react';
import { render } from '@testing-library/react';

import { OutlineButton } from '../src';

describe('OutlineButton tests', () => {
  test('should render correctly', () => {
    const testFn = jest.fn;
    const { container } = render(
      <OutlineButton text="hello" type="default" onClick={testFn} />
    );
    expect(container).toMatchSnapshot();
  });
});
