import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultiSelect } from '../src';
import { data } from './data';
import { backspace } from './helper';
import { act } from 'react-dom/test-utils';

export const createBubbledEvent = (type, props = {}) => {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, props);
  return event;
};

describe('MultiSelect tests', () => {
  const setCheckedItems = jest.fn();

  test('should render correctcly', () => {
    const { container } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
        id="id"
        selectBoxId="selectBoxId"
        backgroundColor="red"
        selectId="selectId"
        inputId="inputId"
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should be callable without an id', () => {
    const { container } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
        selectBoxId="selectBoxId"
        backgroundColor="red"
        selectId="selectId"
        inputId="inputId"
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should be callable withough a selectBoxId', () => {
    const { container } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
        backgroundColor="red"
        selectId="selectId"
        inputId="inputId"
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should be callable without a backgroundColor, selectId, or inputId', () => {
    const { container } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('should be clickable', () => {
    jest.useFakeTimers();
    const { container } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    const option = screen.getByRole('option', { name: /select a department/i });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);
    const checkBoxes = document.querySelector(
      '.multi-select-checkboxes'
    ) as HTMLElement;
    expect(checkBoxes).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  test('should be able to click on the first checkbox', async () => {
    jest.useFakeTimers();
    const { container } = render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    const option = screen.getByRole('option', { name: /select a department/i });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    const check = screen.getByRole('checkbox', { name: /Grocery/i });
    expect(check).not.toBeChecked();

    await fireEvent.click(check);
    expect(check).toBeChecked();

    expect(container).toMatchSnapshot();
  });

  test('should close checkboxes window', () => {
    jest.useFakeTimers();
    render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    const option = screen.getByRole('option', { name: /select a department/i });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    // now close the box
    fireEvent.click(option);
    const checkBoxes = document.querySelector(
      '.multi-select-checkboxes'
    ) as HTMLElement;
    expect(checkBoxes).not.toBeInTheDocument();
  });

  test('should handle unchecking a box', async () => {
    jest.useFakeTimers();
    render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
      />
    );

    const option = screen.getByRole('option', { name: /select a department/i });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    const check = screen.getByRole('checkbox', { name: /Grocery/i });
    expect(check).not.toBeChecked();

    await fireEvent.click(check);
    expect(check).toBeChecked();

    await fireEvent.click(check);
    expect(check).not.toBeChecked();

    // this test is to trigger line 109
    const check1 = screen.getByRole('checkbox', { name: /Nonfood/i });
    expect(check1).not.toBeChecked();

    await fireEvent.click(check1);
    expect(check1).toBeChecked();
  });

  test('should be able to search', () => {
    jest.useFakeTimers();
    render(
      <MultiSelect
        data={data}
        defaultOption="select a department"
        keyDescriptor="keyDescriptor"
        optionValue="id"
        optionText="value"
        checkedItems={[]}
        setCheckedItems={setCheckedItems}
        inputId={'inputId'}
      />
    );

    const option = screen.getByRole('option', { name: /select a department/ });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    const input = screen.getByPlaceholderText(/search/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'gro' } });
    expect(input.value).toEqual('gro');

    backspace(input);
    expect(input.value).toEqual('gr');

    backspace(input);
    backspace(input);
    expect(input.value).toEqual('');
  });

  test('should handle clicking when clientX < rect.left', () => {
    render(
      <div id="main" data-testid="main" style={{ padding: '100px' }}>
        <p>Here is the first div</p>
        <button>button</button>
        <MultiSelect
          data={data}
          defaultOption="select a department"
          keyDescriptor="keyDescriptor"
          optionValue="id"
          optionText="value"
          checkedItems={[]}
          setCheckedItems={setCheckedItems}
          inputId={'inputId'}
        />
      </div>
    );

    const option = screen.getByRole('option', { name: /select a department/ });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    const div = screen.queryByText(/button/i) as HTMLElement;

    act(() => {
      div.dispatchEvent(
        createBubbledEvent('click', { clientX: -5, clientY: 0 })
      );
    });
  });

  test('should handle click when clientX > rect.right', () => {
    render(
      <div id="main" data-testid="main" style={{ padding: '100px' }}>
        <p>Here is the first div</p>
        <button>button</button>
        <MultiSelect
          data={data}
          defaultOption="select a department"
          keyDescriptor="keyDescriptor"
          optionValue="id"
          optionText="value"
          checkedItems={[]}
          setCheckedItems={setCheckedItems}
          inputId={'inputId'}
        />
      </div>
    );

    const option = screen.getByRole('option', { name: /select a department/ });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    const div = screen.queryByText(/button/i) as HTMLElement;

    act(() => {
      div.dispatchEvent(
        createBubbledEvent('click', { clientX: 10, clientY: 0 })
      );
    });
  });

  test('should handle click when clientY < rect.top', () => {
    render(
      <div id="main" data-testid="main" style={{ padding: '100px' }}>
        <p>Here is the first div</p>
        <button>button</button>
        <MultiSelect
          data={data}
          defaultOption="select a department"
          keyDescriptor="keyDescriptor"
          optionValue="id"
          optionText="value"
          checkedItems={[]}
          setCheckedItems={setCheckedItems}
          inputId={'inputId'}
        />
      </div>
    );

    const option = screen.getByRole('option', { name: /select a department/ });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    const div = screen.queryByText(/button/i) as HTMLElement;

    act(() => {
      div.dispatchEvent(
        createBubbledEvent('click', { clientX: 0, clientY: -5 })
      );
    });
  });

  test('should handle click when clientY > rect.bottom', () => {
    render(
      <div id="main" data-testid="main" style={{ padding: '100px' }}>
        <p>Here is the first div</p>
        <button>button</button>
        <MultiSelect
          data={data}
          defaultOption="select a department"
          keyDescriptor="keyDescriptor"
          optionValue="id"
          optionText="value"
          checkedItems={[]}
          setCheckedItems={setCheckedItems}
          inputId={'inputId'}
        />
      </div>
    );

    const option = screen.getByRole('option', { name: /select a department/ });
    fireEvent.click(option);
    jest.advanceTimersByTime(1000);

    const div = screen.queryByText(/button/i) as HTMLElement;

    act(() => {
      div.dispatchEvent(
        createBubbledEvent('click', { clientX: 0, clientY: 20 })
      );
    });
  });
});
