import React from 'react';

import './ToggleSwitch.css';

export interface ToggleSwitchProps {
  id: string;
  handleClick: (id: string, checked: boolean) => void;
  active: boolean;
  disabled?:boolean;
}

function ToggleSwitch(props: ToggleSwitchProps) {
  const { id, handleClick, disabled } = props;
  let {active} = props

  if ( disabled) active = false;

  const onClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleClick(id, e.target.checked);
  };

  return (
    <div className={disabled ? 'toggle-switch toggle-switch-disabled' : 'toggle-switch'}>
      <input
        type="checkbox"
        className="toggle-switch-checkbox"
        name={id}
        data-testid={`toggle-switch-checkbox-${id}`}
        id={id}
        onChange={onClick}
        checked={active}
      />
      <label className="toggle-switch-label" htmlFor={id}>
        <span className="toggle-switch-inner" />
        <span className="toggle-switch-switch" />
      </label>
    </div>
  );
}

export default ToggleSwitch;
