import React from 'react';
import { createPortal } from 'react-dom';

export interface MultiSelectPortalProps<T> {
  data: T[];
  keyDescriptor: string;
  optionText: keyof T;
  open: boolean;
  handleCheck: (CheckBox: React.ChangeEvent<HTMLInputElement>, data: T) => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
  amIChecked: (e: T) => boolean;
  inputId: string;
  id?: string;
}

const MultiSelectPortal = <T,>(props: MultiSelectPortalProps<T>) => {
  const {
    open,
    handleSearchChange,
    search,
    inputId,
    data,
    keyDescriptor,
    optionText,
    amIChecked,
    handleCheck,
    id = 'multi-select-checkboxes',
  } = props;

  const portalDiv = document.getElementById('ms-portal-container');

  return (
    <React.Fragment>
      {open && portalDiv
        ? createPortal(
            <div className="multi-select-checkboxes" id={id}>
              <input
                className="form-control"
                placeholder="Search"
                type="text"
                onChange={handleSearchChange}
                value={search}
                id={inputId}
              />
              {data && data.length > 0 ? (
                <React.Fragment>
                  {data.map((d, i) => (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <label key={`${keyDescriptor}-${i}`}>
                      <input
                        type="checkbox"
                        checked={amIChecked(d)}
                        onChange={(e) => handleCheck(e, d)}
                      />
                      {d[optionText]}
                    </label>
                  ))}
                </React.Fragment>
              ) : null}
            </div>,
            portalDiv
          )
        : null}
    </React.Fragment>
  );
};

export default MultiSelectPortal;
