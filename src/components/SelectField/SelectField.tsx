import React from 'react';
import './SelectField.css';

export type SelectTheme = 'light' | 'dark';

export interface SelectFieldProps<T> {
  id: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => string;
  valueField: keyof T;
  displayField: keyof T;
  error?: string;
  emptyMsg: string;
  data: T[];
  theme?: SelectTheme;
}

const SelectField = <T,>(props: SelectFieldProps<T>): JSX.Element => {
  let wrapperClass = 'c5cl-select';
  if (props.error && props.error.length > 0) {
    wrapperClass += ' has-error';
  }

  const { theme = 'light' } = props;

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id} className={`c5cl-select-label-${theme}`}>
        {props.label}
      </label>
      <div className="field">
        <select
          id={props.id}
          onChange={props.onChange}
          className={`c5cl-select-${theme}`}
        >
          <option value="0">{props.emptyMsg}</option>
          {props.data && props.data.length === 0
            ? null
            : props.data.map((item: T, index: number) => (
                <option
                  key={`%{props.id}-${index}`}
                  value={item[props.valueField] as string}
                >
                  {item[props.displayField] as string}
                </option>
              ))}
        </select>
        {props.error ? (
          <div data-testid="alert" className="alert-danger">
            {props.error}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SelectField;
