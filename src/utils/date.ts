export type FormatDateType = string | Date;

const getDateDetails = (d: Date) => {
  const month = d.getMonth();
  const day = d.getDate();
  const year = d.getFullYear();
  return {
    month,
    day,
    year,
  };
};

const daysInMonth = (month: number, year: number) => {
  return 40 - new Date(year, month, 40).getDate();
};

const isSameMonth = (day: Date, monthStart: Date) => {
  return (
    day.getFullYear() === monthStart.getFullYear() &&
    day.getMonth() === monthStart.getMonth()
  );
};

const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const formatDate = (d: FormatDateType) => {
  if (typeof d === 'undefined') return '';
  if (d === null) return '';
  if (Object.prototype.toString.call(d) == '[object Date]') {
    if (isNaN((d as Date).getTime())) {
      return '';
    }
  }
  d = d.toString();
  const date = new Date(d);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return month + '/' + day + '/' + year;
};

const addDays = (date: FormatDateType, days: number) => {
  if (typeof date === 'undefined' || date === null) {
    date = new Date();
  }

  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export {
  getDateDetails,
  daysInMonth,
  isSameMonth,
  isSameDay,
  formatDate,
  addDays,
};
