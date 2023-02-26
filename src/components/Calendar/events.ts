const testDate = new Date(2022, 2, 26);
const month = testDate.getMonth();
const year = testDate.getFullYear();

export const events = [
  {
    id: 1,
    date: new Date(year, month, 3),
    title: 'First test event',
    description: 'Meet with the Q&A Team to further discuss matters',
    start: '8:00 AM',
    end: '9:00 AM',
  },
  {
    id: 2,
    date: new Date(year, month, 15),
    title: 'Layout Software Design',
    description: 'Layout the needs for the new project',
    start: '8:00 AM',
    end: '9:00 AM',
  },
  {
    id: 3,
    date: new Date(year, month, 20),
    title: 'Interview new Employee',
    description:
      'Interview Jonas Hill with Tommy to see if he can pass the coding challenge',
    start: '8:00 AM',
    end: '9:00 AM',
  },
  {
    id: 4,
    date: new Date(year, month, 3),
    title: 'Create Calendar',
    description: 'write the code to create the calendar',
    start: '8:00 AM',
    end: '9:00 AM',
  },
  {
    id: 5,
    date: new Date(year, month, 3),
    title: 'Code Review',
    description: 'review Debbies code before merging pull request',
    start: '8:00 AM',
    end: '9:00 AM',
  },
  {
    id: 6,
    date: new Date(year, month, 15),
    title: 'Create Code Display Component',
    description: 'write the code needed for the Code Display Component',
    start: '8:00 AM',
    end: '9:00 AM',
  },
];
