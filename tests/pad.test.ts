import { pad } from '../src';

describe('pad tests', () => {
  test('should handle numeric input', () => {
    expect(pad(9)).toEqual(9);
  });

  test('should handle string for desired length', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(pad('ss', 'ss')).toEqual('ss');
  });

  test('should handle non string padChar', () => {
    expect(pad('ss', 5, 5)).toEqual('ss');
  });

  test('should handle left padding', () => {
    expect(pad('ss', 4, '0')).toEqual('00ss');
  });

  test('should handle right padding', () => {
    expect(pad('ss', 4, '0', 'right')).toEqual('ss00');
  });

  test('should handle padding a string too long', () => {
    expect(pad('0002', 2, '0')).toEqual('02');
  });

  test('should not padd if the length is already correct', () => {
    expect(pad('02', 2, 'a')).toEqual('02');
  });
});
