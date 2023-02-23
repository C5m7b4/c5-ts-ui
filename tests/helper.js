import { fireEvent } from '@testing-library/react';

export function backspace(element) {
  let actuallyTyped = element.value;

  const backspaceKey = {
    key: 'Backspace',
    code: 8,
    inputType: 'deleteContentBackward',
  };

  const sharedEventConfig = {
    key: backspaceKey.key,
    charCode: backspaceKey.code,
    keyCode: backspaceKey.code,
    which: backspaceKey.code,
    modifier: backspaceKey.modifier,
  };

  const downEvent = fireEvent.keyDown(element, sharedEventConfig);

  /* istanbul ignore else */
  if (downEvent) {
    actuallyTyped = actuallyTyped.slice(0, -1);

    fireEvent.input(element, {
      target: { value: actuallyTyped },
      inputType: backspaceKey.inputType,
      bubbles: true,
      cancelable: true,
    });

    fireEvent.keyUp(element, sharedEventConfig);
  }
}
