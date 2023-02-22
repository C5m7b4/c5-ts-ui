import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Tooltip } from '../src';

describe('Tooltip tests', () => {
  test('should render correctly', () => {
    const { container } = render(
      <Tooltip position="top" message="tooltip">
        <h2>Hello</h2>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle some style', () => {
    const { container } = render(
      <Tooltip
        position="top"
        message="tooltip"
        style={{ backgroundColor: 'red' }}
      >
        <h2>Hello</h2>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle mouseOver', async () => {
    const { container } = render(
      <Tooltip position="top" message="tooltip">
        <div>Hello</div>
      </Tooltip>
    );

    const header = container.querySelector(
      '.mcl-tooltip-trigger'
    ) as HTMLDivElement;
    fireEvent.mouseOver(header);
    fireEvent.mouseLeave(header);
    fireEvent.mouseOut(header);
  });

  test('should handle dark mode', () => {
    const { container } = render(
      <Tooltip position="bottom" message="tooltip" theme="dark">
        <button>Hello</button>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  test('should render without a position', () => {
    const { container } = render(
      <Tooltip message="tooltip" theme="light">
        <div>Hellos</div>
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });
});
