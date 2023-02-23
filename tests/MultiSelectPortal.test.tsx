import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import { MultiSelectPortal } from '../src';
import { data } from './data';

describe('MultiSelectPortal tests', () => {
  const handleCheck = jest.fn();
  const handleSearchChange = jest.fn();
  const amIChecked = jest.fn();

  beforeEach(() => {
    const div = document.createElement('div');
    div.id = 'ms-portal-container';
    document.body.appendChild(div);
  });

  test('should render correcctly', () => {
    const { container } = render(
      <MultiSelectPortal
        data={data}
        keyDescriptor={'select a department'}
        optionText={'value'}
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputId"
        id="id"
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should render correctly without an id', () => {
    const { container } = render(
      <MultiSelectPortal
        data={data}
        keyDescriptor={'select a department'}
        optionText={'value'}
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputId"
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should not draw a portal', () => {
    const { container } = render(
      <MultiSelectPortal
        data={[]}
        keyDescriptor={'select a department'}
        optionText={'value'}
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputId"
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle not opening the portal', () => {
    const { container } = render(
      <MultiSelectPortal
        data={[]}
        keyDescriptor={'select a department'}
        optionText={'value'}
        open={false}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputId"
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle checking a box', async () => {
    const { container } = render(
      <MultiSelectPortal
        data={data}
        keyDescriptor={'select a department'}
        optionText={'value'}
        open={true}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        amIChecked={amIChecked}
        search=""
        inputId="inputId"
        id="id"
      />
    );

    const check = screen.getByRole('checkbox', { name: /Grocery/ });
    expect(check).not.toBeChecked();
    await fireEvent.click(check);
    expect(check).toBeChecked();
    expect(container).toMatchSnapshot();
  });
});
