import React from 'react';

import './TextField.css';

export type TextTheme = 'light' | 'dark';
export type TextFieldType = 'text' | 'number';
export type TextFieldAutoComplete = 'on' | 'off' | string;

export interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: TextFieldType;
  placeholder?: string;
  value: string | number;
  error?: string;
  readOnly?: boolean;
  autoComplete?: TextFieldAutoComplete;
  theme?: TextTheme;
}

export const TextField = (props: TextFieldProps): JSX.Element => {
  let wrapperClass = `c5cl-textInput`;
  if (props.error && props.error.length > 0) {
    wrapperClass += ' has-error';
  }

  const { theme = 'light' } = props;

  return (
    <div className={wrapperClass}>
      <label htmlFor={props.id} className={`c5cl-textinput-label-${theme}`}>
        {props.label}
      </label>
      <div className="field">
        <input
          id={props.id}
          type={props.type}
          onChange={props.onChange}
          className={`c5cl-textinput-${theme}`}
          value={props.value}
          placeholder={props.placeholder}
          readOnly={props.readOnly}
          name={props.name}
          autoComplete={props.autoComplete}
        />
      </div>
      {props.error && (
        <div className="alert alert-danger" data-testid="alert">
          {props.error}
        </div>
      )}
    </div>
  );
};

export default TextField;
