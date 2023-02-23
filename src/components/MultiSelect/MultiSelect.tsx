import React, { useState, useEffect } from 'react';
import MultiSelectPortal from './MultiSelectPortal';

import './MultiSelect.css';

export interface MultiSelectProps<T> {
  data: T[];
  defaultOption: string;
  keyDescriptor: string;
  optionValue: keyof T;
  optionText: keyof T;
  checkedItems: string[];
  setCheckedItems: (s: string[]) => void;
  id?: string;
  selectBoxId?: string;
  backgroundColor?: string;
  selectId?: string;
  inputId?: string;
}

const MultiSelect = <T,>(props: MultiSelectProps<T>) => {
  const [show, setShow] = useState(false);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [search, setSearch] = useState('');
  const [locallyCheckedItems, setLocallyCheckedItems] = useState<string[]>([]);

  const {
    id = 'multi-select-checkboxes',
    selectBoxId = 'select-box-id',
    backgroundColor = '#1f1e1e',
    selectId = 'select-id',
    inputId = 'multi-select-search',
    checkedItems,
    setCheckedItems,
    keyDescriptor,
    optionText,
    optionValue,
  } = props;

  useEffect(() => {
    setFilteredData(props.data);
    setLocallyCheckedItems(checkedItems);
  }, [props.data]);

  const amIChecked = (i: T) => {
    if (locallyCheckedItems.includes(i[optionValue] as unknown as string)) {
      return true;
    } else {
      return false;
    }
  };

  const tapOutside = (e: MouseEvent) => {
    const portal = document.getElementById(id);
    if (portal) {
      const rect = portal.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right) {
        setShow(false);
        window.removeEventListener('click', tapOutside);
        return;
      }
      if (e.clientY < rect.top || e.clientY > rect.bottom) {
        setShow(false);
        window.removeEventListener('click', tapOutside);
        return;
      }
    } else {
      window.removeEventListener('click', tapOutside);
    }
  };

  const showCheckboxes = () => {
    if (show) {
      setShow(false);
      return;
    } else {
      setShow(true);
    }

    const actualSelect = document.getElementById(selectId) as HTMLSelectElement;
    const firstChild = actualSelect.childNodes[0] as HTMLDivElement;
    /* istanbul ignore else */
    if (firstChild) {
      firstChild.style.display = 'none';
    }
    /* istanbul ignore else */
    if (actualSelect) {
      setTimeout(() => {
        const select = document.getElementById(selectBoxId);
        const portal = document.getElementById(id);

        /* istanbul ignore else */
        if (select && portal) {
          const selectRect = select.getBoundingClientRect();
          portal.style.top = selectRect.bottom + 'px';
          portal.style.left = selectRect.left + 'px';
          portal.style.backgroundColor = backgroundColor;
          window.addEventListener('click', tapOutside);
          const input = document.getElementById(inputId);
          /* istanbul ignore else */
          if (input) {
            input.focus();
          }
        }
      }, 100);
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, i: T) => {
    const columnValue = i[optionValue] as unknown as string;

    if (e.target.checked) {
      /* istanbul ignore else */
      if (!locallyCheckedItems.includes(columnValue)) {
        setCheckedItems([...checkedItems, columnValue]);
        setLocallyCheckedItems([...locallyCheckedItems, columnValue]);
      }
    } else {
      const newArray = locallyCheckedItems.filter((i) => i != columnValue);
      setCheckedItems(newArray);
      setLocallyCheckedItems(newArray);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length === 0) {
      setFilteredData(props.data);
    } else {
      const filtered = props.data.filter((s) => {
        const recordValue = s[optionText] as unknown as string;
        if (
          recordValue.toLowerCase().startsWith(e.target.value.toLowerCase())
        ) {
          return s;
        }
      });
      setFilteredData(filtered);
    }
  };

  return (
    <div className="multi-select">
      <div
        className="select-box"
        id={selectBoxId}
        onClick={() => showCheckboxes()}
      >
        <select className="form-control" id={selectId}>
          <option value="0">{props.defaultOption}</option>
        </select>
      </div>
      <div id="ms-portal-container"></div>
      <MultiSelectPortal
        open={show}
        data={filteredData}
        id={id}
        keyDescriptor={keyDescriptor}
        optionText={optionText}
        handleCheck={handleCheck}
        handleSearchChange={handleSearchChange}
        search={search}
        amIChecked={amIChecked}
        inputId={inputId}
      />
    </div>
  );
};

export default MultiSelect;
