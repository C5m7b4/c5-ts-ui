import React from 'react';
import { getDateDetails } from '../src';
import { fireEvent, render } from '@testing-library/react';

import { Calendar } from '../src';
// import { act } from 'react-dom/test-utils';

const testfn = jest.fn();
const testDate = new Date(2022, 2, 26);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let harness: any;

describe('Calendar tests', () => {
  beforeEach(() => {
    harness = document.createElement('div');
    document.body.appendChild(harness);
  });

  afterEach(() => {
    document.body.removeChild(harness);
    harness = null;
  });

  test('should render correctly', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle not having a default date', () => {
    const { container } = render(<Calendar onChange={testfn} />);
    // make sure that that date in the selected class has the correct date
    const selected = container.querySelector('.selected') as HTMLDivElement;
    // now we get the span that is inside of that and make sure it matches the day of the month
    const span = selected.querySelector('span') as HTMLSpanElement;
    const { day } = getDateDetails(new Date());
    expect(span.innerHTML.toString()).toEqual(day.toString());
  });

  test('should render next month', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} />
    );
    const next = container.querySelector('.next') as HTMLDivElement;
    fireEvent.click(next);
    expect(container).toMatchSnapshot();
  });

  test('should render previous month', () => {
    const { container } = render(
      <Calendar onChange={testfn} date={testDate} />
    );
    const prev = container.querySelector('.prev') as HTMLDivElement;
    fireEvent.click(prev);
    expect(container).toMatchSnapshot();
  });

  test('should handle next year', () => {
    const newDate = new Date(2022, 11, 31);
    const { container } = render(<Calendar onChange={testfn} date={newDate} />);
    const next = container.querySelector('.next') as HTMLDivElement;
    fireEvent.click(next);
    expect(container).toMatchSnapshot();
  });

  test('should handle previous year', () => {
    const newDate = new Date(2022, 0, 1);
    const { container } = render(<Calendar onChange={testfn} date={newDate} />);
    const prev = container.querySelector('.prev') as HTMLDivElement;
    fireEvent.click(prev);
    expect(container).toMatchSnapshot();
  });

  test('should handle a date click', () => {
    const newDate = new Date(2022, 1, 24);
    const { container } = render(<Calendar onChange={testfn} date={newDate} />);

    const nodes = container.querySelectorAll('div.col.cell');
    const node = nodes[3] as HTMLDivElement;
    fireEvent.click(node);
    const innerHTML = node.querySelector('span')?.innerHTML;
    expect(innerHTML).toEqual('2');
  });

  test('should handle not having an onChange event', () => {
    const newDate = new Date(2022, 1, 24);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { container } = render(<Calendar date={newDate} />);
    const nodes = container.querySelectorAll('div.col.cell');
    const node = nodes[3] as HTMLDivElement;
    fireEvent.click(node);
    const innerHTML = node.querySelector('span')?.innerHTML;
    expect(innerHTML).toEqual('2');
  });
});
