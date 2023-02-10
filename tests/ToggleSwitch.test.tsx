import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';

import {ToggleSwitch} from '../src'

describe('ToggleSwitch tests', () => {
  const testFn = jest.fn();

  test('should render correctly', () => {
    const frag = render(<ToggleSwitch id="t1" active={true} handleClick={testFn} />)
    expect(frag).toMatchSnapshot();
  })

  test('should handle click', () => {
    render(<ToggleSwitch id="t1" active={true} handleClick={testFn} />)
    const check: HTMLInputElement = screen.getByTestId('toggle-switch-checkbox-t1')

    fireEvent.click(check);
    expect(check.checked).toBeTruthy()
  })

  test('should handle being disabled', () => {
    const frag = render(<ToggleSwitch disabled={true} id="t1" handleClick={testFn} />)
    expect(frag).toMatchSnapshot();
  })
})