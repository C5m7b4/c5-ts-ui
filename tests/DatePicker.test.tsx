import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { DatePicker } from '../src';

describe('DatePicker tests', () => {
  const testfn = jest.fn();

  test('should render correctly', () => {
    const { container } = render(
      <DatePicker onChange={testfn} date={new Date('3/2/2023')} />
    );
    expect(container).toMatchSnapshot();
  });

  test('should handle month change backwards', () => {
    jest.useFakeTimers();
    const { container } = render(
      <DatePicker onChange={testfn} date={new Date('3/2/2023')} />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(200);
    const btn = container.querySelector(
      '.mdp-head-button-left-arrow'
    ) as HTMLDivElement;
    fireEvent.click(btn);
    jest.advanceTimersByTime(200);
    const title = container.querySelector('#c5-dp-1-title') as HTMLDivElement;
    expect(title.innerHTML).toEqual('2/2/2023');
  });

  test('should handle month change forwards', () => {
    jest.useFakeTimers();
    const { container } = render(
      <DatePicker onChange={testfn} date={new Date('3/2/2023')} />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(200);
    const btn = container.querySelector(
      '.mdp-head-button-right-arrow'
    ) as HTMLDivElement;
    fireEvent.click(btn);
    jest.advanceTimersByTime(200);
    const title = container.querySelector('#c5-dp-1-title') as HTMLDivElement;
    expect(title.innerHTML).toEqual('4/2/2023');
  });

  test('should render with an id', () => {
    const { container } = render(
      <DatePicker onChange={testfn} id={'1'} date={new Date('3/2/2023')} />
    );
    const input = container.querySelector(
      '#c5-dp-1 > input'
    ) as HTMLInputElement;
    expect(input.value).toEqual('2023-03-02');
  });

  test('should handle selecting a new date', () => {
    jest.useFakeTimers();
    const { container, getByText } = render(
      <DatePicker onChange={testfn} date={new Date('3/2/2023')} id="1" />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(200);
    const day = getByText('15');
    fireEvent.click(day);
    jest.advanceTimersByTime(500);
    const input = container.querySelector(
      '#c5-dp-1 > input'
    ) as HTMLInputElement;
    expect(input.value).toEqual('2023-03-15');
  });

  test('should handle no default date', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    render(<DatePicker onChange={testfn} />);
  });

  test('should handle next month change when its a twelve', () => {
    jest.useFakeTimers();
    const { container } = render(
      <DatePicker onChange={testfn} date={new Date('12/2/2022')} />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(200);
    const btn = container.querySelector(
      '.mdp-head-button-right-arrow'
    ) as HTMLDivElement;
    fireEvent.click(btn);
    jest.advanceTimersByTime(200);
    const title = container.querySelector('#c5-dp-1-title') as HTMLDivElement;
    expect(title.innerHTML).toEqual('1/2/2023');
  });

  test('should handle previous month change when its a one', () => {
    jest.useFakeTimers();
    const { container } = render(
      <DatePicker onChange={testfn} date={new Date('1/1/2023')} />
    );
    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(200);
    const btn = container.querySelector(
      '.mdp-head-button-left-arrow'
    ) as HTMLDivElement;
    fireEvent.click(btn);
    jest.advanceTimersByTime(200);
    const title = container.querySelector('#c5-dp-1-title') as HTMLDivElement;
    expect(title.innerHTML).toEqual('12/1/2022');
  });

  test('should handle clicking outside', () => {
    jest.useFakeTimers();
    const { container } = render(
      <div>
        <p>Here is the first div</p>
        <button>button</button>
        <DatePicker onChange={testfn} date={new Date('1/1/2023')} />
      </div>
    );

    const div = container.querySelector('#c5-dp-1') as HTMLDivElement;
    fireEvent.click(div);
    jest.advanceTimersByTime(500);

    fireEvent.click(div);
    jest.advanceTimersByTime(500);

    // now we click on the backdrop
    const backdrop = container.querySelector(
      '#c5-dp-1-backdrop'
    ) as HTMLDivElement;
    fireEvent.click(backdrop);

    const input = container.querySelector(
      '#c5-dp-1 > input'
    ) as HTMLInputElement;
    expect(input.value).toEqual('2023-01-01');
  });
});
