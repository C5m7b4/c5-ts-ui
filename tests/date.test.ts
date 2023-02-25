import {
  getDateDetails,
  daysInMonth,
  isSameMonth,
  isSameDay,
  formatDate,
  addDays,
} from '../src';

describe('getDateDetails tests', () => {
  test('should return 1 for day, 0 for month, 2022 for year', () => {
    const testDate = new Date(2022, 0, 1);
    const { day, month, year } = getDateDetails(testDate);
    expect(day).toEqual(1);
    expect(month).toEqual(0);
    expect(year).toEqual(2022);
  });
});

describe('daysInMonth', () => {
  test('should return the days in the months', () => {
    expect(daysInMonth(0, 2022)).toEqual(31);
    expect(daysInMonth(1, 2022)).toEqual(28);
    expect(daysInMonth(2, 2022)).toEqual(31);
    expect(daysInMonth(3, 2022)).toEqual(30);
    expect(daysInMonth(4, 2022)).toEqual(31);
    expect(daysInMonth(5, 2022)).toEqual(30);
    expect(daysInMonth(6, 2022)).toEqual(31);
    expect(daysInMonth(7, 2022)).toEqual(31);
    expect(daysInMonth(8, 2022)).toEqual(30);
    expect(daysInMonth(9, 2022)).toEqual(31);
    expect(daysInMonth(10, 2022)).toEqual(30);
    expect(daysInMonth(11, 2022)).toEqual(31);
  });
});

describe('isSameMonth', () => {
  test('should determine if the month is the same', () => {
    const testDate = new Date(2022, 2, 5);
    const goodDate = new Date(2022, 2, 15);
    const badDate = new Date(2022, 1, 5);
    expect(isSameMonth(goodDate, testDate)).toBeTruthy();
    expect(isSameMonth(badDate, testDate)).toBeFalsy();
  });
});

describe('isSameDay', () => {
  test('should determine if the days are the same', () => {
    const testDate = new Date(2022, 2, 5);
    const goodDate = new Date(2022, 2, 5);
    const badDate1 = new Date(2022, 2, 6);
    const badDate2 = new Date(2021, 2, 5);
    expect(isSameDay(goodDate, testDate)).toBeTruthy();
    expect(isSameDay(badDate1, testDate)).toBeFalsy();
    expect(isSameDay(badDate2, testDate)).toBeFalsy();
  });
});

describe('formatDate', () => {
  test('should return an empty string if the value is null or undefined', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(formatDate(null)).toBe('');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(formatDate(undefined)).toBe('');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(formatDate()).toBe('');
  });
  test("should return '1/1/2020' if a date object is passed in", () => {
    expect(formatDate(new Date('1/1/2020'))).toBe('1/1/2020');
  });
  test("should return '1/1/2020' if a date with a time is present", () => {
    expect(formatDate('1/1/2020 2:00 PM')).toEqual('1/1/2020');
  });
  test('should return an empty string when an invalid date is passed in', () => {
    expect(formatDate(new Date('1/41/2020'))).toBe('');
  });
});

describe('addDays', () => {
  test('should add days from string', () => {
    const newDate = addDays('1/1/2022', 5);
    expect(formatDate(newDate)).toEqual('1/6/2022');
  });
  test('should handle undefined', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newDate = addDays('undefined', 5);
    expect(formatDate(newDate)).toEqual('');
  });
  test('should handle null', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newDate = addDays(null, 5);
    const futureDate = addDays(new Date(), 5);
    expect(formatDate(newDate)).toEqual(formatDate(futureDate));
  });
});
